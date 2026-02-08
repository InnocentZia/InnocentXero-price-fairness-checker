from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import math

from app.database import get_db, init_db
from app.seed import seed_database

app = FastAPI(title="FairPrice API", version="1.0.0")

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


class ProductCreate(BaseModel):
    id: str
    name: str
    category: str
    category_label: str
    subcategory: str = ''
    brand: str = ''
    category_path: str = ''
    description: str
    unit: str
    base_usd_price: float


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    category_label: Optional[str] = None
    subcategory: Optional[str] = None
    brand: Optional[str] = None
    category_path: Optional[str] = None
    description: Optional[str] = None
    unit: Optional[str] = None
    base_usd_price: Optional[float] = None


class PriceUpdate(BaseModel):
    local_price: float
    notes: Optional[str] = None


def row_to_dict(row):
    return dict(row)


def get_all_prices_usd(product_id: str):
    conn = get_db()
    rows = conn.execute("""
        SELECT p.local_price, c.exchange_rate, c.code
        FROM prices p JOIN countries c ON p.country_code = c.code
        WHERE p.product_id = ?
    """, (product_id,)).fetchall()
    conn.close()
    return [(r["local_price"] / r["exchange_rate"], r["code"]) for r in rows]


def calculate_fairness(product_id: str, country_code: str):
    conn = get_db()
    product = conn.execute("SELECT * FROM products WHERE id = ?", (product_id,)).fetchone()
    country = conn.execute("SELECT * FROM countries WHERE code = ?", (country_code,)).fetchone()
    price_entry = conn.execute("SELECT * FROM prices WHERE product_id = ? AND country_code = ?", (product_id, country_code)).fetchone()
    us_country = conn.execute("SELECT * FROM countries WHERE code = 'US'").fetchone()
    us_price_entry = conn.execute("SELECT * FROM prices WHERE product_id = ? AND country_code = 'US'", (product_id,)).fetchone()
    conn.close()

    if not product or not country or not price_entry or not us_country or not us_price_entry:
        return None

    price_usd = price_entry["local_price"] / country["exchange_rate"]
    us_price = us_price_entry["local_price"] / us_country["exchange_rate"]

    all_prices = get_all_prices_usd(product_id)
    all_usd = sorted([p[0] for p in all_prices])
    global_median = all_usd[len(all_usd) // 2] if all_usd else us_price

    ppp_price = price_usd * country["ppp_factor"]
    us_ppp = us_price * us_country["ppp_factor"]

    income_pct = (price_usd / country["median_income"]) * 100
    us_income_pct = (us_price / us_country["median_income"]) * 100

    raw_ratio = price_usd / us_price if us_price else 1
    raw_score = max(0, min(100, 50 + (1 - raw_ratio) * 50))

    ppp_ratio = ppp_price / us_ppp if us_ppp else 1
    ppp_score = max(0, min(100, 50 + (1 - ppp_ratio) * 50))

    income_ratio = income_pct / us_income_pct if us_income_pct else 1
    income_score = max(0, min(100, 50 + (1 - income_ratio) * 50))

    col_ratio = (price_usd / country["cost_of_living_index"]) / (us_price / us_country["cost_of_living_index"]) if us_price else 1
    col_score = max(0, min(100, 50 + (1 - col_ratio) * 50))

    factors = []
    if price_entry["tax_rate"] > 0:
        factors.append({
            "label": f"VAT/GST ({price_entry['tax_rate']}%)",
            "impact": "increases",
            "percentage": price_entry["tax_rate"],
            "description": f"Price includes {price_entry['tax_rate']}% tax" if price_entry["includes_tax"] else f"Additional {price_entry['tax_rate']}% tax applies",
        })
    if price_entry["import_duty"] > 0:
        factors.append({
            "label": f"Import Duties (~{price_entry['import_duty']}%)",
            "impact": "increases",
            "percentage": price_entry["import_duty"],
            "description": f"Average import duty of {price_entry['import_duty']}% in {country['name']}",
        })
    if price_entry["distribution_markup"] > 5:
        factors.append({
            "label": "Distribution Costs",
            "impact": "increases",
            "percentage": price_entry["distribution_markup"],
            "description": f"Higher logistics costs contribute ~{price_entry['distribution_markup']}% markup in {country['name']}",
        })
    if country["ppp_factor"] > 1.5:
        factors.append({
            "label": "Lower Purchasing Power",
            "impact": "increases",
            "percentage": round((country["ppp_factor"] - 1) * 100),
            "description": f"{country['name']} has {country['ppp_factor']}x purchasing power adjustment",
        })

    cheaper_count = sum(1 for p in all_usd if p < price_usd)
    percentile = round((cheaper_count / len(all_usd)) * 100) if all_usd else 50
    median_diff = round(((price_usd - global_median) / global_median) * 100) if global_median else 0

    return {
        "product": row_to_dict(product),
        "country": row_to_dict(country),
        "price": row_to_dict(price_entry),
        "scores": {
            "raw": round(raw_score, 1),
            "ppp": round(ppp_score, 1),
            "income": round(income_score, 1),
            "col": round(col_score, 1),
        },
        "price_usd": round(price_usd, 2),
        "us_price": round(us_price, 2),
        "global_median_usd": round(global_median, 2),
        "ppp_adjusted_price": round(ppp_price, 2),
        "income_percentage": round(income_pct, 4),
        "us_income_percentage": round(us_income_pct, 4),
        "percentile": percentile,
        "median_diff_percent": median_diff,
        "factors": factors,
        "total_countries": len(all_usd),
    }


@app.on_event("startup")
def startup():
    init_db()
    seed_database()


@app.get("/healthz")
async def healthz():
    return {"status": "ok"}


@app.get("/api/products")
async def list_products(
    category: Optional[str] = None,
    subcategory: Optional[str] = None,
    brand: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = Query(200, ge=1, le=500),
    offset: int = Query(0, ge=0),
):
    conn = get_db()
    query = "SELECT * FROM products WHERE 1=1"
    count_query = "SELECT COUNT(*) FROM products WHERE 1=1"
    params: list = []
    count_params: list = []
    if category:
        query += " AND category = ?"
        count_query += " AND category = ?"
        params.append(category)
        count_params.append(category)
    if subcategory:
        query += " AND subcategory = ?"
        count_query += " AND subcategory = ?"
        params.append(subcategory)
        count_params.append(subcategory)
    if brand:
        query += " AND brand = ?"
        count_query += " AND brand = ?"
        params.append(brand)
        count_params.append(brand)
    if search:
        query += " AND (LOWER(name) LIKE ? OR LOWER(category_label) LIKE ? OR LOWER(brand) LIKE ? OR LOWER(subcategory) LIKE ?)"
        count_query += " AND (LOWER(name) LIKE ? OR LOWER(category_label) LIKE ? OR LOWER(brand) LIKE ? OR LOWER(subcategory) LIKE ?)"
        s = f"%{search.lower()}%"
        params.extend([s, s, s, s])
        count_params.extend([s, s, s, s])
    query += " ORDER BY name LIMIT ? OFFSET ?"
    params.extend([limit, offset])
    rows = conn.execute(query, params).fetchall()
    total = conn.execute(count_query, count_params).fetchone()[0]
    conn.close()
    return {"products": [row_to_dict(r) for r in rows], "total": total}


@app.get("/api/products/{product_id}")
async def get_product(product_id: str):
    conn = get_db()
    product = conn.execute("SELECT * FROM products WHERE id = ?", (product_id,)).fetchone()
    if not product:
        conn.close()
        raise HTTPException(status_code=404, detail="Product not found")
    prices = conn.execute("""
        SELECT p.*, c.name as country_name, c.flag, c.currency, c.currency_symbol, c.exchange_rate
        FROM prices p JOIN countries c ON p.country_code = c.code
        WHERE p.product_id = ?
        ORDER BY c.name
    """, (product_id,)).fetchall()
    conn.close()
    return {"product": row_to_dict(product), "prices": [row_to_dict(r) for r in prices]}


@app.post("/api/products", status_code=201)
async def create_product(product: ProductCreate):
    conn = get_db()
    existing = conn.execute("SELECT id FROM products WHERE id = ?", (product.id,)).fetchone()
    if existing:
        conn.close()
        raise HTTPException(status_code=409, detail="Product already exists")
    conn.execute(
        "INSERT INTO products (id, name, category, category_label, subcategory, brand, category_path, description, unit, base_usd_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (product.id, product.name, product.category, product.category_label, product.subcategory, product.brand, product.category_path, product.description, product.unit, product.base_usd_price)
    )
    countries = conn.execute("SELECT * FROM countries").fetchall()
    from app.seed import generate_price
    for c in countries:
        price_data = generate_price(product.base_usd_price, product.category, c["code"], c["exchange_rate"], c["vat_rate"], c["import_duty_avg"])
        conn.execute(
            "INSERT INTO prices (product_id, country_code, local_price, includes_tax, tax_rate, import_duty, distribution_markup, reports) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (product.id, c["code"], price_data["local_price"], price_data["includes_tax"], price_data["tax_rate"], price_data["import_duty"], price_data["distribution_markup"], price_data["reports"])
        )
    conn.commit()
    conn.close()
    return {"id": product.id, "message": "Product created with prices for all countries"}


@app.put("/api/products/{product_id}")
async def update_product(product_id: str, update: ProductUpdate):
    conn = get_db()
    existing = conn.execute("SELECT * FROM products WHERE id = ?", (product_id,)).fetchone()
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Product not found")
    fields = []
    values = []
    for field, value in update.model_dump(exclude_none=True).items():
        fields.append(f"{field} = ?")
        values.append(value)
    if not fields:
        conn.close()
        raise HTTPException(status_code=400, detail="No fields to update")
    if update.base_usd_price is not None:
        fields.append("updated_at = CURRENT_TIMESTAMP")
    values.append(product_id)
    conn.execute(f"UPDATE products SET {', '.join(fields)} WHERE id = ?", values)
    if update.base_usd_price is not None:
        countries_rows = conn.execute("SELECT * FROM countries").fetchall()
        category = update.category or existing["category"]
        from app.seed import generate_price
        for c in countries_rows:
            price_data = generate_price(update.base_usd_price, category, c["code"], c["exchange_rate"], c["vat_rate"], c["import_duty_avg"])
            conn.execute(
                "UPDATE prices SET local_price = ?, updated_at = CURRENT_TIMESTAMP WHERE product_id = ? AND country_code = ?",
                (price_data["local_price"], product_id, c["code"])
            )
    conn.commit()
    conn.close()
    return {"message": "Product updated"}


@app.delete("/api/products/{product_id}")
async def delete_product(product_id: str):
    conn = get_db()
    existing = conn.execute("SELECT id FROM products WHERE id = ?", (product_id,)).fetchone()
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Product not found")
    conn.execute("DELETE FROM prices WHERE product_id = ?", (product_id,))
    conn.execute("DELETE FROM products WHERE id = ?", (product_id,))
    conn.commit()
    conn.close()
    return {"message": "Product deleted"}


@app.put("/api/prices/{product_id}/{country_code}")
async def update_price(product_id: str, country_code: str, update: PriceUpdate):
    conn = get_db()
    existing = conn.execute("SELECT id FROM prices WHERE product_id = ? AND country_code = ?", (product_id, country_code)).fetchone()
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Price entry not found")
    conn.execute(
        "UPDATE prices SET local_price = ?, notes = ?, updated_at = CURRENT_TIMESTAMP WHERE product_id = ? AND country_code = ?",
        (update.local_price, update.notes, product_id, country_code)
    )
    conn.commit()
    conn.close()
    return {"message": "Price updated"}


@app.get("/api/countries")
async def list_countries():
    conn = get_db()
    rows = conn.execute("SELECT * FROM countries ORDER BY name").fetchall()
    conn.close()
    return {"countries": [row_to_dict(r) for r in rows]}


@app.get("/api/countries/{code}")
async def get_country(code: str):
    conn = get_db()
    country = conn.execute("SELECT * FROM countries WHERE code = ?", (code,)).fetchone()
    if not country:
        conn.close()
        raise HTTPException(status_code=404, detail="Country not found")
    conn.close()
    return row_to_dict(country)


@app.get("/api/fairness/{product_id}/{country_code}")
async def get_fairness(product_id: str, country_code: str):
    result = calculate_fairness(product_id, country_code)
    if not result:
        raise HTTPException(status_code=404, detail="Product or country not found")
    return result


@app.get("/api/leaderboard")
async def get_leaderboard():
    conn = get_db()
    countries = conn.execute("SELECT * FROM countries ORDER BY name").fetchall()
    products = conn.execute("SELECT id FROM products").fetchall()
    conn.close()
    results = []
    for country in countries:
        scores = []
        for product in products:
            fair = calculate_fairness(product["id"], country["code"])
            if fair:
                scores.append(fair["scores"]["ppp"])
        avg_score = sum(scores) / len(scores) if scores else 50
        results.append({
            "country": row_to_dict(country),
            "avg_score": round(avg_score, 1),
            "product_count": len(scores),
        })
    results.sort(key=lambda x: x["avg_score"], reverse=True)
    return {"leaderboard": results}


@app.get("/api/stats")
async def get_stats():
    conn = get_db()
    total_products = conn.execute("SELECT COUNT(*) FROM products").fetchone()[0]
    total_countries = conn.execute("SELECT COUNT(*) FROM countries").fetchone()[0]
    total_prices = conn.execute("SELECT COUNT(*) FROM prices").fetchone()[0]
    conn.close()
    return {
        "total_products": total_products,
        "total_countries": total_countries,
        "total_price_entries": total_prices,
    }


@app.get("/api/categories")
async def list_categories():
    conn = get_db()
    rows = conn.execute("SELECT DISTINCT category, category_label FROM products ORDER BY category_label").fetchall()
    result = []
    for r in rows:
        subcats = conn.execute("SELECT DISTINCT subcategory FROM products WHERE category = ? AND subcategory != '' ORDER BY subcategory", (r["category"],)).fetchall()
        brands = conn.execute("SELECT DISTINCT brand FROM products WHERE category = ? AND brand != '' ORDER BY brand", (r["category"],)).fetchall()
        result.append({
            "id": r["category"],
            "label": r["category_label"],
            "subcategories": [s["subcategory"] for s in subcats],
            "brands": [b["brand"] for b in brands],
        })
    conn.close()
    return {"categories": result}


@app.get("/api/brands")
async def list_brands(category: Optional[str] = None):
    conn = get_db()
    if category:
        rows = conn.execute("SELECT DISTINCT brand FROM products WHERE category = ? AND brand != '' ORDER BY brand", (category,)).fetchall()
    else:
        rows = conn.execute("SELECT DISTINCT brand FROM products WHERE brand != '' ORDER BY brand").fetchall()
    conn.close()
    return {"brands": [r["brand"] for r in rows]}


@app.get("/api/subcategories")
async def list_subcategories(category: Optional[str] = None):
    conn = get_db()
    if category:
        rows = conn.execute("SELECT DISTINCT subcategory FROM products WHERE category = ? AND subcategory != '' ORDER BY subcategory", (category,)).fetchall()
    else:
        rows = conn.execute("SELECT DISTINCT subcategory FROM products WHERE subcategory != '' ORDER BY subcategory").fetchall()
    conn.close()
    return {"subcategories": [r["subcategory"] for r in rows]}


@app.get("/api/compare/{product_id}")
async def compare_product(product_id: str):
    conn = get_db()
    product = conn.execute("SELECT * FROM products WHERE id = ?", (product_id,)).fetchone()
    if not product:
        conn.close()
        raise HTTPException(status_code=404, detail="Product not found")
    countries = conn.execute("SELECT * FROM countries ORDER BY name").fetchall()
    conn.close()
    comparisons = []
    for country in countries:
        fair = calculate_fairness(product_id, country["code"])
        if fair:
            comparisons.append({
                "country": row_to_dict(country),
                "price_usd": fair["price_usd"],
                "local_price": fair["price"]["local_price"],
                "scores": fair["scores"],
                "percentile": fair["percentile"],
            })
    comparisons.sort(key=lambda x: x["price_usd"])
    return {"product": row_to_dict(product), "comparisons": comparisons}
