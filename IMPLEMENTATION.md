# JWT Authentication & Access Control Implementation

## Overview
Implemented user authentication with JWT and secure account management for the Node.js MongoDB API.

## Features Implemented

### 1. User Authentication
- User registration with email and password
- User login with JWT token generation
- Password hashing using bcryptjs
- JWT token expiration (7 days)

### 2. Password Management
- Forgot password (generates reset token)
- Reset password with token validation
- Change password (requires current password)

### 3. User Profile
- Get user profile (protected route)
- Logout functionality

### 4. Access Control
- Public routes: View categories and products
- Protected routes: Create, update, delete categories and products
- Cart operations: All require authentication

## API Endpoints

### Authentication (Public)
```
POST /api/auth/register          - Register new user
POST /api/auth/login             - Login user
POST /api/auth/forgot-password   - Request password reset
POST /api/auth/reset-password    - Reset password with token
```

### User Management (Protected)
```
GET  /api/users/profile          - Get user profile
POST /api/users/change-password  - Change password
POST /api/users/logout           - Logout user
```

### Categories
```
GET    /api/categories           - View all (Public)
GET    /api/categories/:id       - View single (Public)
POST   /api/categories           - Create (Protected)
PUT    /api/categories/:id       - Update (Protected)
DELETE /api/categories/:id       - Delete (Protected)
```

### Products
```
GET    /api/products             - View all (Public)
GET    /api/products/:id         - View single (Public)
POST   /api/products             - Create (Protected)
PUT    /api/products/:id         - Update (Protected)
DELETE /api/products/:id         - Delete (Protected)
```

### Cart (All Protected)
```
GET    /api/cart                 - Get user's cart
POST   /api/cart/items           - Add item to cart
PUT    /api/cart/items/:id       - Update item quantity
DELETE /api/cart/items/:id       - Remove item from cart
DELETE /api/cart                 - Clear entire cart
```

## Authentication Flow

1. **Register/Login**: User receives JWT token
2. **Protected Routes**: Include token in header: `Authorization: Bearer <token>`
3. **Cart Operations**: Automatically linked to userId from JWT

## Models

### User Model
```typescript
{
  email: string
  password: string (hashed)
  resetToken?: string
  resetTokenExpiry?: Date
}
```

### Cart Model
```typescript
{
  userId: ObjectId (ref: User)
  items: [{
    product: string
    quantity: number
  }]
}
```

## Environment Variables
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/nodedb
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_in_production
```

## Dependencies Added
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation and verification

## Security Features
- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with expiration
- Protected routes with authentication middleware
- Cart operations tied to authenticated user only
- Reset tokens with expiration (1 hour)
