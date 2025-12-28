import pool from '../db/db.js';

export const createAccount = async (id, owner) => {
    const result = await pool.query(
        'INSERT INTO accounts (id, owner, balance) VALUES ($1, $2, 0.00) RETURNING *',
        [id, owner]
    );
    return result.rows[0];
};

export const getAccount = async (id) => {
    const result = await pool.query('SELECT * FROM accounts WHERE id = $1', [id]);
    return result.rows[0];
};

export const updateBalance = async (client, id, amount) => {

    return await client.query(
        'UPDATE accounts SET balance = balance + $1 WHERE id = $2 RETURNING balance',
        [amount, id]
    );
};

export const logTransaction = async (client, id, type, amount) => {
    await client.query(
        'INSERT INTO transactions (account_id, type, amount) VALUES ($1, $2, $3)',
        [id, type, amount]
    );
};

export const getHistory = async (id) => {
    const result = await pool.query(
        'SELECT type, amount, timestamp FROM transactions WHERE account_id = $1 ORDER BY id DESC',
        [id]
    );
    return result.rows;
};