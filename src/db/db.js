import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});


const initDb = async () => {
    const queries = `
        CREATE TABLE IF NOT EXISTS accounts (
            id TEXT PRIMARY KEY,
            owner TEXT,
            balance DECIMAL(10, 2) DEFAULT 0.00
        );
        CREATE TABLE IF NOT EXISTS transactions (
            id SERIAL PRIMARY KEY,
            account_id TEXT,
            type TEXT,
            amount DECIMAL(10, 2),
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(account_id) REFERENCES accounts(id)
        );
    `;
    try {
        await pool.query(queries);
        console.log("✅ Database tables checked/initialized.");
    } catch (err) {
        console.error("❌ Database initialization failed:", err);
    }
};

initDb();

export default pool;