# Node_With_Mongo
Node.js REST API with MongoDB, TypeScript, and JWT Authentication

## Features
- User authentication with JWT
- Category management
- Product management
- Shopping cart functionality
- Password reset and management
- Role-based access control

## Tech Stack
- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/nodedb
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_in_production
```

## Running the Application

```bash
# Development mode
npm run dev

# Build
npm run build

# Production
npm start
```

## API Documentation

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Reset Password
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "resetToken": "token_from_forgot_password",
  "newPassword": "newpassword123"
}
```

### User Management (Protected)

#### Get Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Change Password
```http
POST /api/users/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}
```

#### Logout
```http
POST /api/users/logout
Authorization: Bearer <token>
```

### Categories

#### Get All Categories (Public)
```http
GET /api/categories
```

#### Get Category by ID (Public)
```http
GET /api/categories/:id
```

#### Create Category (Protected)
```http
POST /api/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Electronics",
  "description": "Electronic items"
}
```

#### Update Category (Protected)
```http
PUT /api/categories/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description"
}
```

#### Delete Category (Protected)
```http
DELETE /api/categories/:id
Authorization: Bearer <token>
```

### Products

#### Get All Products (Public)
```http
GET /api/products
```

#### Get Product by ID (Public)
```http
GET /api/products/:id
```

#### Create Product (Protected)
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Laptop",
  "price": 999.99,
  "description": "High-performance laptop",
  "category": "Electronics",
  "inStock": true,
  "quantity": 10
}
```

#### Update Product (Protected)
```http
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Laptop",
  "price": 899.99,
  "quantity": 15
}
```

#### Delete Product (Protected)
```http
DELETE /api/products/:id
Authorization: Bearer <token>
```

### Cart (All Protected)

#### Get Cart
```http
GET /api/cart
Authorization: Bearer <token>
```

#### Add Item to Cart
```http
POST /api/cart/items
Authorization: Bearer <token>
Content-Type: application/json

{
  "product": "product_id",
  "quantity": 2
}
```

#### Update Cart Item
```http
PUT /api/cart/items/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 5
}
```

#### Remove Cart Item
```http
DELETE /api/cart/items/:id
Authorization: Bearer <token>
```

#### Clear Cart
```http
DELETE /api/cart
Authorization: Bearer <token>
```

## Project Structure

```
src/
├── config/
│   └── database.ts          # MongoDB connection
├── controllers/
│   ├── auth.controller.ts   # Authentication logic
│   ├── users.controller.ts  # User management
│   ├── categoryController.ts
│   ├── productController.ts
│   └── cartController.ts
├── middlewares/
│   └── authenticate.ts      # JWT authentication middleware
├── models/
│   ├── User.ts
│   ├── Category.ts
│   ├── Product.ts
│   └── Cart.ts
├── routes/
│   ├── auth.ts
│   ├── users.ts
│   ├── categoryRoutes.ts
│   ├── productRoutes.ts
│   └── cartRoutes.ts
├── app.ts                   # Express app setup
└── index.ts                 # Server entry point
```

## Security Features
- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes with authentication middleware
- Token expiration (7 days)
- Password reset with time-limited tokens
- User-specific cart operations

## Access Control
- **Public**: View categories and products
- **Protected**: Create, update, delete categories and products
- **User-specific**: All cart operations tied to authenticated user

# Project documentation Here, http://localhost:3000/api-docs


## License
Patrick
