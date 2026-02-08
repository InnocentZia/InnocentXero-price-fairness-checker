import sqlite3
import os

DB_PATH = os.environ.get("DATABASE_PATH", "/data/app.db")
if not os.path.exists(os.path.dirname(DB_PATH)):
    DB_PATH = os.path.join(os.path.dirname(__file__), "..", "app.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA foreign_keys=ON")
    return conn

def init_db():
    conn = get_db()
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS countries (
            code TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            flag TEXT NOT NULL,
            currency TEXT NOT NULL,
            currency_symbol TEXT NOT NULL,
            exchange_rate REAL NOT NULL,
            ppp_factor REAL NOT NULL,
            median_income REAL NOT NULL,
            cost_of_living_index REAL NOT NULL,
            vat_rate REAL NOT NULL,
            import_duty_avg REAL NOT NULL,
            region TEXT NOT NULL,
            income_group TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS products (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            category_label TEXT NOT NULL,
            subcategory TEXT NOT NULL DEFAULT '',
            brand TEXT NOT NULL DEFAULT '',
            category_path TEXT NOT NULL DEFAULT '',
            description TEXT NOT NULL,
            unit TEXT NOT NULL,
            base_usd_price REAL NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS prices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id TEXT NOT NULL,
            country_code TEXT NOT NULL,
            local_price REAL NOT NULL,
            includes_tax INTEGER NOT NULL DEFAULT 1,
            tax_rate REAL NOT NULL DEFAULT 0,
            import_duty REAL NOT NULL DEFAULT 0,
            distribution_markup REAL NOT NULL DEFAULT 0,
            reports INTEGER NOT NULL DEFAULT 500,
            notes TEXT,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
            FOREIGN KEY (country_code) REFERENCES countries(code),
            UNIQUE(product_id, country_code)
        );

        CREATE INDEX IF NOT EXISTS idx_prices_product ON prices(product_id);
        CREATE INDEX IF NOT EXISTS idx_prices_country ON prices(country_code);
        CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
    """)
    cols = [row[1] for row in conn.execute("PRAGMA table_info(products)").fetchall()]
    if "subcategory" not in cols:
        conn.execute("ALTER TABLE products ADD COLUMN subcategory TEXT NOT NULL DEFAULT ''")
    if "brand" not in cols:
        conn.execute("ALTER TABLE products ADD COLUMN brand TEXT NOT NULL DEFAULT ''")
    if "category_path" not in cols:
        conn.execute("ALTER TABLE products ADD COLUMN category_path TEXT NOT NULL DEFAULT ''")
    conn.executescript("""
        CREATE INDEX IF NOT EXISTS idx_products_subcategory ON products(subcategory);
        CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
    """)
    conn.commit()
    conn.close()
