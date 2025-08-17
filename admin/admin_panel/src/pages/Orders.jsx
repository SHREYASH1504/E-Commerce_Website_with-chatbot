import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const res = await axios.get('/order/all');
        setOrders(Array.isArray(res.data.orders) ? res.data.orders : []);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      }
      setLoading(false);
    }
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId) => {
    try {
      await axios.put(`/order/${orderId}/status`, { status });
      setOrders(orders =>
        orders.map(order =>
          order._id === orderId ? { ...order, status } : order
        )
      );
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>All Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId?.name || 'N/A'}</td> {/* Use userId based on population */}
                <td>${order.items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0)}</td>
                <td>{order.status}</td>
                <td>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <button onClick={() => setSelectedOrder(order)}>View</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No orders found</td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedOrder && (
        <div>
          <h3>Order Details</h3>
          <div>
            Status: 
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
            <button onClick={() => handleStatusChange(selectedOrder._id)}>Update Status</button>
          </div>
            <h4>Items</h4>
  <table>
    <thead>
      <tr>
        <th>Product ID</th>
        <th>Size</th>
        <th>Quantity</th>
        <th>Price (per unit)</th>
        <th>Subtotal</th>
      </tr>
    </thead>
    <tbody>
      {selectedOrder.items.map((item, index) => (
        <tr key={index}>
          <td>{item.productId}</td>
          <td>{item.size}</td>
          <td>{item.quantity}</td>
          <td>${item.price || 0}</td>
          <td>${(item.price || 0) * item.quantity}</td>
        </tr>
      ))}
    </tbody>
  </table>

  <h4>Delivery Info</h4>
  <p>{selectedOrder.deliveryInfo?.address || 'No address provided'}</p>
  <p>{selectedOrder.deliveryInfo?.city || ''}, {selectedOrder.deliveryInfo?.postalCode || ''}</p>
  <p>{selectedOrder.deliveryInfo?.country || ''}</p>

  <h4>Payment Method</h4>
  <p>{selectedOrder.paymentMethod || 'N/A'}</p>
        </div>
      )}
    </div>
  );
}

export default Orders;
