import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

// Create a new order (COD only)
const createOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const { deliveryInfo } = req.body;
        console.log('createOrder: userId from token:', userId);
        const user = await userModel.findById(userId);
        console.log('createOrder: user found:', user ? true : false, user ? user.email : null);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        const cartData = user.cartData;
        if (!cartData || Object.keys(cartData).length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }
        // Convert cartData to items array
        const items = [];
        for (const productId in cartData) {
            for (const size in cartData[productId]) {
                items.push({
                    productId,
                    size,
                    quantity: cartData[productId][size],
                    price: 0 // Will populate price later if needed
                });
            }
        }
        // Optionally, fetch product prices and fill in price field
        // For now, price is set to 0 for simplicity
        const order = await orderModel.create({
            userId,
            items,
            deliveryInfo,
            paymentMethod: 'COD',
            status: 'Pending'
        });
        // Clear user's cart
        user.cartData = {};
        await user.save();
        res.json({ success: true, order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status (for admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const order = await orderModel.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    order.status = status;
    await order.save();

    res.json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { createOrder, getAllOrders, updateOrderStatus };
