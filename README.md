# E-commerce Website

This is a full-stack e-commerce web application built with a modern JavaScript stack. It features user authentication, product browsing, cart management, order processing, and an admin panel for managing orders and products.

## Features

- User registration and login with authentication
- Product listing, search, and filtering
- Add to cart, update cart, and remove items
- Place orders with Cash on Delivery (COD) payment method
- Admin panel to view orders, update order status, and manage products
- Responsive and user-friendly UI

## Technologies Used

- **Frontend:** React, Axios, Context API
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Other:** Git, GitHub

## Project Structure
root/
│
├── admin/ # Admin panel source files
│ ├── admin_panel/ # React admin panel components
│
├── back-end/ # Backend source files
│ ├── controllers/ # Express route controllers
│ ├── middleware/ # Authentication middleware
│ ├── models/ # Mongoose models
│ ├── routes/ # Express route definitions
│ └── server.js # Express app entry point
│
├── front-end/ # Frontend source files
│ ├── src/ # React app source
│ └── public/ # Public assets
│
├── package.json # Root package configuration (if any)
│
├── README.md # This file

text

## Setup Instructions

1. **Clone the repository**

git clone https://github.com/SHREYASH1504/E-Commerce_Website_with-chatbot.git
cd E-commerce-Website

2. **Backend Setup**

cd back-end
npm install

Create a .env file for environment variables (e.g. MongoDB URI, JWT secret)
npm start


3. **Frontend Setup**

cd front-end
npm install

Create a .env file for frontend environment variables if needed
npm start


4. **Admin Panel Setup**

cd admin/admin_panel
npm install
npm start


---

## API Endpoints (Summary)

- `POST /order/create` - Create a new order (authenticated user)
- `GET /order/all` - Get all orders (admin only)
- `PUT /order/:orderId/status` - Update order status (admin only)
- Cart API endpoints for managing user cart

---

## Notes

- Ensure your backend server is running before starting frontend or admin panel.
- Protect sensitive routes with proper authentication and authorization.
- Customize environment variables as per your development or production setup.

---

## License

This project is licensed under the MIT License.

---

Feel free to open issues or contribute via pull requests.



