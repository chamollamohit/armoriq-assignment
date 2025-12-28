import express from 'express';
import * as BankController from '../controllers/bankController.js';

const router = express.Router();

router.post('/accounts', BankController.createAccount);
router.post('/deposit', BankController.deposit);
router.post('/withdraw', BankController.withdraw);
router.get('/balance/:id', BankController.getBalance);
router.get('/history/:id', BankController.getHistory);

export default router;