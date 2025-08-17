import express from 'express';
import { createOrder, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';
import authUser from '../middleware/auth.js'; // Assuming you have authentication middleware

const orderRouter = express.Router();

orderRouter.post('/create', authUser, createOrder);
orderRouter.get('/all', authUser, getAllOrders); // Only allow authenticated users (admin ideally)
orderRouter.put('/:orderId/status', authUser, updateOrderStatus); // Update order status

export default orderRouter;