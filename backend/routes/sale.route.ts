import express from 'express';
import { createSale } from '../controllers/sale.controller';

const router = express.Router();

router.post('/', createSale);

export default router;