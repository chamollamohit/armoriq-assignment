import express from 'express';
import * as BankController from '../controllers/bankController.js';
import { validate, createAccountSchema, transactionSchema } from '../utils/validation.js';
const router = express.Router();

router.post('/accounts', validate(createAccountSchema), BankController.createAccount);
router.post('/deposit', validate(transactionSchema), BankController.deposit);
router.post('/withdraw', validate(transactionSchema), BankController.withdraw);
router.get('/balance/:id', BankController.getBalance);
router.get('/history/:id', BankController.getHistory);

export default router;