import math
from app.database import get_db, init_db
from app.products_data import PRODUCTS

COUNTRIES = [
    {"code": "US", "name": "United States", "flag": "\U0001f1fa\U0001f1f8", "currency": "USD", "currency_symbol": "$", "exchange_rate": 1, "ppp_factor": 1, "median_income": 45000, "cost_of_living_index": 100, "vat_rate": 0, "import_duty_avg": 3, "region": "North America", "income_group": "high"},
    {"code": "GB", "name": "United Kingdom", "flag": "\U0001f1ec\U0001f1e7", "currency": "GBP", "currency_symbol": "\u00a3", "exchange_rate": 0.79, "ppp_factor": 0.9, "median_income": 32000, "cost_of_living_index": 85, "vat_rate": 20, "import_duty_avg": 4, "region": "Europe", "income_group": "high"},
    {"code": "DE", "name": "Germany", "flag": "\U0001f1e9\U0001f1ea", "currency": "EUR", "currency_symbol": "\u20ac", "exchange_rate": 0.92, "ppp_factor": 0.85, "median_income": 35000, "cost_of_living_index": 78, "vat_rate": 19, "import_duty_avg": 4, "region": "Europe", "income_group": "high"},
    {"code": "FR", "name": "France", "flag": "\U0001f1eb\U0001f1f7", "currency": "EUR", "currency_symbol": "\u20ac", "exchange_rate": 0.92, "ppp_factor": 0.88, "median_income": 32000, "cost_of_living_index": 82, "vat_rate": 20, "import_duty_avg": 4, "region": "Europe", "income_group": "high"},
    {"code": "JP", "name": "Japan", "flag": "\U0001f1ef\U0001f1f5", "currency": "JPY", "currency_symbol": "\u00a5", "exchange_rate": 149, "ppp_factor": 0.75, "median_income": 30000, "cost_of_living_index": 82, "vat_rate": 10, "import_duty_avg": 4, "region": "Asia", "income_group": "high"},
    {"code": "AU", "name": "Australia", "flag": "\U0001f1e6\U0001f1fa", "currency": "AUD", "currency_symbol": "A$", "exchange_rate": 1.53, "ppp_factor": 0.88, "median_income": 38000, "cost_of_living_index": 90, "vat_rate": 10, "import_duty_avg": 5, "region": "Oceania", "income_group": "high"},
    {"code": "CA", "name": "Canada", "flag": "\U0001f1e8\U0001f1e6", "currency": "CAD", "currency_symbol": "C$", "exchange_rate": 1.36, "ppp_factor": 0.92, "median_income": 36000, "cost_of_living_index": 80, "vat_rate": 13, "import_duty_avg": 4, "region": "North America", "income_group": "high"},
    {"code": "CH", "name": "Switzerland", "flag": "\U0001f1e8\U0001f1ed", "currency": "CHF", "currency_symbol": "CHF", "exchange_rate": 0.88, "ppp_factor": 0.6, "median_income": 55000, "cost_of_living_index": 135, "vat_rate": 8, "import_duty_avg": 2, "region": "Europe", "income_group": "high"},
    {"code": "SE", "name": "Sweden", "flag": "\U0001f1f8\U0001f1ea", "currency": "SEK", "currency_symbol": "kr", "exchange_rate": 10.4, "ppp_factor": 0.82, "median_income": 38000, "cost_of_living_index": 95, "vat_rate": 25, "import_duty_avg": 4, "region": "Europe", "income_group": "high"},
    {"code": "KR", "name": "South Korea", "flag": "\U0001f1f0\U0001f1f7", "currency": "KRW", "currency_symbol": "\u20a9", "exchange_rate": 1320, "ppp_factor": 0.78, "median_income": 28000, "cost_of_living_index": 75, "vat_rate": 10, "import_duty_avg": 8, "region": "Asia", "income_group": "high"},
    {"code": "AE", "name": "UAE", "flag": "\U0001f1e6\U0001f1ea", "currency": "AED", "currency_symbol": "AED", "exchange_rate": 3.67, "ppp_factor": 0.85, "median_income": 40000, "cost_of_living_index": 70, "vat_rate": 5, "import_duty_avg": 5, "region": "Middle East", "income_group": "high"},
    {"code": "PL", "name": "Poland", "flag": "\U0001f1f5\U0001f1f1", "currency": "PLN", "currency_symbol": "z\u0142", "exchange_rate": 4.03, "ppp_factor": 1.8, "median_income": 16000, "cost_of_living_index": 50, "vat_rate": 23, "import_duty_avg": 4, "region": "Europe", "income_group": "high"},
    {"code": "BR", "name": "Brazil", "flag": "\U0001f1e7\U0001f1f7", "currency": "BRL", "currency_symbol": "R$", "exchange_rate": 4.97, "ppp_factor": 2.2, "median_income": 8000, "cost_of_living_index": 42, "vat_rate": 17, "import_duty_avg": 14, "region": "South America", "income_group": "upper-middle"},
    {"code": "MX", "name": "Mexico", "flag": "\U0001f1f2\U0001f1fd", "currency": "MXN", "currency_symbol": "MX$", "exchange_rate": 17.1, "ppp_factor": 2.4, "median_income": 6000, "cost_of_living_index": 38, "vat_rate": 16, "import_duty_avg": 10, "region": "North America", "income_group": "upper-middle"},
    {"code": "TR", "name": "Turkey", "flag": "\U0001f1f9\U0001f1f7", "currency": "TRY", "currency_symbol": "\u20ba", "exchange_rate": 30.2, "ppp_factor": 2.8, "median_income": 7500, "cost_of_living_index": 35, "vat_rate": 20, "import_duty_avg": 12, "region": "Europe", "income_group": "upper-middle"},
    {"code": "ZA", "name": "South Africa", "flag": "\U0001f1ff\U0001f1e6", "currency": "ZAR", "currency_symbol": "R", "exchange_rate": 18.7, "ppp_factor": 2.5, "median_income": 5500, "cost_of_living_index": 38, "vat_rate": 15, "import_duty_avg": 8, "region": "Africa", "income_group": "upper-middle"},
    {"code": "IN", "name": "India", "flag": "\U0001f1ee\U0001f1f3", "currency": "INR", "currency_symbol": "\u20b9", "exchange_rate": 83.1, "ppp_factor": 3.5, "median_income": 2500, "cost_of_living_index": 28, "vat_rate": 18, "import_duty_avg": 15, "region": "Asia", "income_group": "lower-middle"},
    {"code": "ID", "name": "Indonesia", "flag": "\U0001f1ee\U0001f1e9", "currency": "IDR", "currency_symbol": "Rp", "exchange_rate": 15600, "ppp_factor": 3.2, "median_income": 4000, "cost_of_living_index": 32, "vat_rate": 11, "import_duty_avg": 10, "region": "Asia", "income_group": "lower-middle"},
    {"code": "EG", "name": "Egypt", "flag": "\U0001f1ea\U0001f1ec", "currency": "EGP", "currency_symbol": "E\u00a3", "exchange_rate": 30.9, "ppp_factor": 3.8, "median_income": 3000, "cost_of_living_index": 25, "vat_rate": 14, "import_duty_avg": 20, "region": "Africa", "income_group": "lower-middle"},
    {"code": "NG", "name": "Nigeria", "flag": "\U0001f1f3\U0001f1ec", "currency": "NGN", "currency_symbol": "\u20a6", "exchange_rate": 1500, "ppp_factor": 4.0, "median_income": 2000, "cost_of_living_index": 22, "vat_rate": 8, "import_duty_avg": 20, "region": "Africa", "income_group": "lower-middle"},
    {"code": "IT", "name": "Italy", "flag": "\U0001f1ee\U0001f1f9", "currency": "EUR", "currency_symbol": "\u20ac", "exchange_rate": 0.92, "ppp_factor": 0.9, "median_income": 28000, "cost_of_living_index": 75, "vat_rate": 22, "import_duty_avg": 4, "region": "Europe", "income_group": "high"},
    {"code": "ES", "name": "Spain", "flag": "\U0001f1ea\U0001f1f8", "currency": "EUR", "currency_symbol": "\u20ac", "exchange_rate": 0.92, "ppp_factor": 0.95, "median_income": 24000, "cost_of_living_index": 65, "vat_rate": 21, "import_duty_avg": 4, "region": "Europe", "income_group": "high"},
    {"code": "NL", "name": "Netherlands", "flag": "\U0001f1f3\U0001f1f1", "currency": "EUR", "currency_symbol": "\u20ac", "exchange_rate": 0.92, "ppp_factor": 0.82, "median_income": 38000, "cost_of_living_index": 88, "vat_rate": 21, "import_duty_avg": 4, "region": "Europe", "income_group": "high"},
    {"code": "NO", "name": "Norway", "flag": "\U0001f1f3\U0001f1f4", "currency": "NOK", "currency_symbol": "kr", "exchange_rate": 10.5, "ppp_factor": 0.65, "median_income": 50000, "cost_of_living_index": 130, "vat_rate": 25, "import_duty_avg": 3, "region": "Europe", "income_group": "high"},
    {"code": "SG", "name": "Singapore", "flag": "\U0001f1f8\U0001f1ec", "currency": "SGD", "currency_symbol": "S$", "exchange_rate": 1.34, "ppp_factor": 0.72, "median_income": 42000, "cost_of_living_index": 105, "vat_rate": 9, "import_duty_avg": 0, "region": "Asia", "income_group": "high"},
    {"code": "TH", "name": "Thailand", "flag": "\U0001f1f9\U0001f1ed", "currency": "THB", "currency_symbol": "\u0e3f", "exchange_rate": 35.5, "ppp_factor": 2.8, "median_income": 5000, "cost_of_living_index": 35, "vat_rate": 7, "import_duty_avg": 10, "region": "Asia", "income_group": "upper-middle"},
    {"code": "PH", "name": "Philippines", "flag": "\U0001f1f5\U0001f1ed", "currency": "PHP", "currency_symbol": "\u20b1", "exchange_rate": 56, "ppp_factor": 3.3, "median_income": 3500, "cost_of_living_index": 30, "vat_rate": 12, "import_duty_avg": 10, "region": "Asia", "income_group": "lower-middle"},
    {"code": "CO", "name": "Colombia", "flag": "\U0001f1e8\U0001f1f4", "currency": "COP", "currency_symbol": "COL$", "exchange_rate": 3900, "ppp_factor": 2.5, "median_income": 5500, "cost_of_living_index": 35, "vat_rate": 19, "import_duty_avg": 12, "region": "South America", "income_group": "upper-middle"},
    {"code": "AR", "name": "Argentina", "flag": "\U0001f1e6\U0001f1f7", "currency": "ARS", "currency_symbol": "AR$", "exchange_rate": 870, "ppp_factor": 3.0, "median_income": 5000, "cost_of_living_index": 32, "vat_rate": 21, "import_duty_avg": 16, "region": "South America", "income_group": "upper-middle"},
    {"code": "KE", "name": "Kenya", "flag": "\U0001f1f0\U0001f1ea", "currency": "KES", "currency_symbol": "KSh", "exchange_rate": 155, "ppp_factor": 3.5, "median_income": 2500, "cost_of_living_index": 28, "vat_rate": 16, "import_duty_avg": 15, "region": "Africa", "income_group": "lower-middle"},
]

CATEGORY_MULTIPLIERS = {
    "digital": {"US": 1, "GB": 1.05, "DE": 1.08, "FR": 1.08, "JP": 1.1, "AU": 1.12, "CA": 1.02, "CH": 1.0, "SE": 1.08, "KR": 1.05, "AE": 1.0, "PL": 0.65, "BR": 0.55, "MX": 0.6, "TR": 0.45, "ZA": 0.55, "IN": 0.35, "ID": 0.4, "EG": 0.35, "NG": 0.4, "IT": 1.08, "ES": 1.05, "NL": 1.05, "NO": 1.08, "SG": 1.0, "TH": 0.45, "PH": 0.4, "CO": 0.5, "AR": 0.45, "KE": 0.4},
    "physical": {"US": 1, "GB": 1.1, "DE": 1.15, "FR": 1.12, "JP": 1.2, "AU": 1.18, "CA": 1.05, "CH": 1.35, "SE": 1.15, "KR": 1.1, "AE": 0.95, "PL": 0.75, "BR": 1.4, "MX": 0.9, "TR": 1.1, "ZA": 0.85, "IN": 0.7, "ID": 0.75, "EG": 0.8, "NG": 0.9, "IT": 1.15, "ES": 1.1, "NL": 1.12, "NO": 1.2, "SG": 1.05, "TH": 0.8, "PH": 0.75, "CO": 0.85, "AR": 1.2, "KE": 0.8},
    "saas": {"US": 1, "GB": 1.0, "DE": 1.05, "FR": 1.05, "JP": 1.0, "AU": 1.08, "CA": 1.0, "CH": 1.0, "SE": 1.05, "KR": 0.95, "AE": 1.0, "PL": 0.6, "BR": 0.5, "MX": 0.55, "TR": 0.4, "ZA": 0.5, "IN": 0.3, "ID": 0.35, "EG": 0.3, "NG": 0.35, "IT": 1.05, "ES": 1.0, "NL": 1.0, "NO": 1.05, "SG": 1.0, "TH": 0.4, "PH": 0.35, "CO": 0.45, "AR": 0.4, "KE": 0.35},
    "essential": {"US": 1, "GB": 0.9, "DE": 0.85, "FR": 0.88, "JP": 1.1, "AU": 1.05, "CA": 0.95, "CH": 1.5, "SE": 1.0, "KR": 0.85, "AE": 0.8, "PL": 0.45, "BR": 0.5, "MX": 0.4, "TR": 0.35, "ZA": 0.4, "IN": 0.22, "ID": 0.25, "EG": 0.2, "NG": 0.2, "IT": 0.88, "ES": 0.82, "NL": 0.9, "NO": 1.2, "SG": 1.0, "TH": 0.3, "PH": 0.25, "CO": 0.35, "AR": 0.4, "KE": 0.22},
    "service": {"US": 1, "GB": 0.85, "DE": 0.8, "FR": 0.82, "JP": 0.9, "AU": 0.95, "CA": 0.88, "CH": 1.4, "SE": 0.9, "KR": 0.7, "AE": 0.75, "PL": 0.4, "BR": 0.35, "MX": 0.3, "TR": 0.25, "ZA": 0.3, "IN": 0.15, "ID": 0.18, "EG": 0.15, "NG": 0.12, "IT": 0.8, "ES": 0.75, "NL": 0.85, "NO": 1.1, "SG": 0.9, "TH": 0.2, "PH": 0.15, "CO": 0.25, "AR": 0.2, "KE": 0.12},
    "medical": {"US": 1, "GB": 0.25, "DE": 0.3, "FR": 0.28, "JP": 0.35, "AU": 0.4, "CA": 0.3, "CH": 0.5, "SE": 0.2, "KR": 0.3, "AE": 0.45, "PL": 0.15, "BR": 0.2, "MX": 0.18, "TR": 0.12, "ZA": 0.15, "IN": 0.08, "ID": 0.1, "EG": 0.08, "NG": 0.06, "IT": 0.28, "ES": 0.25, "NL": 0.3, "NO": 0.2, "SG": 0.4, "TH": 0.1, "PH": 0.08, "CO": 0.12, "AR": 0.1, "KE": 0.06},
}

def generate_price(base_usd: float, category: str, country_code: str, exchange_rate: float, vat_rate: float, import_duty_avg: float) -> dict:
    multipliers = CATEGORY_MULTIPLIERS.get(category, CATEGORY_MULTIPLIERS["physical"])
    mult = multipliers.get(country_code, 1.0)
    jitter = 0.95 + math.sin(base_usd * 7 + ord(country_code[0]) * 13) * 0.05
    price_usd = base_usd * mult * jitter
    local_price = round(price_usd * exchange_rate * 100) / 100
    is_digital = category in ("digital", "saas")
    return {
        "local_price": local_price,
        "includes_tax": 1 if vat_rate > 0 else 0,
        "tax_rate": vat_rate,
        "import_duty": 0 if is_digital else import_duty_avg,
        "distribution_markup": 0 if is_digital else round((mult - 1) * 30 if mult > 1.1 else 5),
        "reports": 500 + int(abs(math.sin(base_usd + ord(country_code[0]))) * 8000),
    }

def seed_database():
    init_db()
    conn = get_db()
    existing = conn.execute("SELECT COUNT(*) FROM products").fetchone()[0]
    needs_reseed = False
    if existing > 0 and existing >= len(PRODUCTS):
        empty_brands = conn.execute("SELECT COUNT(*) FROM products WHERE brand = '' OR brand IS NULL").fetchone()[0]
        if empty_brands > existing * 0.5:
            needs_reseed = True
        else:
            conn.close()
            return
    if existing > 0:
        conn.execute("DELETE FROM prices")
        conn.execute("DELETE FROM products")
        conn.execute("DELETE FROM countries")
        conn.commit()
    for c in COUNTRIES:
        conn.execute(
            "INSERT OR IGNORE INTO countries (code, name, flag, currency, currency_symbol, exchange_rate, ppp_factor, median_income, cost_of_living_index, vat_rate, import_duty_avg, region, income_group) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (c["code"], c["name"], c["flag"], c["currency"], c["currency_symbol"], c["exchange_rate"], c["ppp_factor"], c["median_income"], c["cost_of_living_index"], c["vat_rate"], c["import_duty_avg"], c["region"], c["income_group"])
        )
    for p in PRODUCTS:
        conn.execute(
            "INSERT OR IGNORE INTO products (id, name, category, category_label, subcategory, brand, category_path, description, unit, base_usd_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (p["id"], p["name"], p["category"], p["category_label"], p.get("subcategory", ""), p.get("brand", ""), p.get("category_path", ""), p["description"], p["unit"], p["base_usd_price"])
        )
        for c in COUNTRIES:
            price_data = generate_price(p["base_usd_price"], p["category"], c["code"], c["exchange_rate"], c["vat_rate"], c["import_duty_avg"])
            conn.execute(
                "INSERT OR IGNORE INTO prices (product_id, country_code, local_price, includes_tax, tax_rate, import_duty, distribution_markup, reports) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                (p["id"], c["code"], price_data["local_price"], price_data["includes_tax"], price_data["tax_rate"], price_data["import_duty"], price_data["distribution_markup"], price_data["reports"])
            )
    conn.commit()
    conn.close()
