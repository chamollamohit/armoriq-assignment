import pool from '../db/db.js';
import * as BankModel from '../models/bankModel.js';
import { v4 as uuidv4 } from 'uuid';

export const createAccount = async (req, res) => {
    const { owner } = req.body;
    if (!owner) return res.status(400).json({ error: "Missing owner name" });

    const newAccountId = uuidv4();

    try {
        const account = await BankModel.createAccount(newAccountId, owner);
        res.status(201).json({
            message: "Account created successfully",
            account_id: newAccountId,
            owner: account.owner,
            balance: account.balance
        });
    } catch (err) {
        res.status(400).json({ error: "Account ID exists or DB error" });
    }
};

export const deposit = async (req, res) => {
    const { account_id, amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid amount" });

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const account = await BankModel.getAccount(account_id);
        if (!account) throw new Error("Account not found");

        await BankModel.updateBalance(client, account_id, amount);
        await BankModel.logTransaction(client, account_id, 'DEPOSIT', amount);

        await client.query('COMMIT');
        res.json({ message: "Deposit successful" });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(400).json({ error: err.message });
    } finally {
        client.release();
    }
};

export const withdraw = async (req, res) => {
    const { account_id, amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid amount" });

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const account = await BankModel.getAccount(account_id);
        if (!account) throw new Error("Account not found");
        if (parseFloat(account.balance) < amount) throw new Error("Insufficient funds");

        await BankModel.updateBalance(client, account_id, -amount);
        await BankModel.logTransaction(client, account_id, 'WITHDRAWAL', amount);

        await client.query('COMMIT');
        res.json({ message: "Withdrawal successful" });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(400).json({ error: err.message });
    } finally {
        client.release();
    }
};

export const getBalance = async (req, res) => {
    try {
        const account = await BankModel.getAccount(req.params.id);
        if (!account) return res.status(404).json({ error: "Account not found" });
        res.json(account);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getHistory = async (req, res) => {
    try {
        const history = await BankModel.getHistory(req.params.id);
        res.json({ account_id: req.params.id, history });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};