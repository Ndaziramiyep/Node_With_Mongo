# Node_With_Mongo
Node.js REST API with MongoDB, TypeScript, JWT Authentication, File Upload, and Email Notifications

## Features
- User authentication with JWT
- Role-based access control (Admin, Vendor, Customer)
- Category management
- Product management with image uploads
- Shopping cart functionality
- Order management with status tracking
- File upload system (profile images, product images)
- Email notification system
- Password reset and management
- Admin user management

## Tech Stack
- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Multer for file uploads
- Nodemailer for email notifications

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin_password
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
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
  "resetToken": "token_from_email",
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

#### Delete Profile
```http
DELETE /api/users/profile
Authorization: Bearer <token>
```

#### Logout
```http
POST /api/users/logout
Authorization: Bearer <token>
```

### File Upload (Protected)

#### Upload Profile Image
```http
POST /api/upload/profile
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
profileImage: [image file]
```

#### Upload Product Images
```http
POST /api/upload/products/:productId
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
productImages: [image files] (max 5)
```

#### Delete Product Image
```http
DELETE /api/upload/products/:productId/images/:imageIndex
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

### Orders (Protected)

#### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "shippingAddress": "123 Main St, City, State 12345"
}
```

#### Get User Orders
```http
GET /api/orders
Authorization: Bearer <token>
```

#### Get Order by ID
```http
GET /api/orders/:id
Authorization: Bearer <token>
```

### Admin Routes (Admin Only)

#### Update Order Status
```http
PUT /api/admin/orders/:orderId/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "shipped"
}
```

## File Upload Features
- **Allowed Types**: JPEG, JPG, PNG, GIF, WebP
- **Size Limit**: 1MB per file
- **Profile Images**: Single image per user
- **Product Images**: Up to 5 images per product
- **Auto Cleanup**: Files deleted when resources are removed
- **Static Serving**: Images accessible via `/uploads` endpoint

## Email Notifications
- **Welcome Email**: Sent on user registration
- **Password Reset**: Sent with reset token
- **Password Changed**: Security notification
- **Order Placed**: Order confirmation
- **Order Status**: Updates on status changes (confirmed, shipped, delivered, cancelled)

## Project Structure

```
src/
├── config/
│   ├── database.ts          # MongoDB connection
│   └── upload.ts            # Multer configuration
├── controllers/
│   ├── auth.controller.ts   # Authentication logic
│   ├── users.controller.ts  # User management
│   ├── admin.controller.ts  # Admin operations
│   ├── categoryController.ts
│   ├── productController.ts
│   ├── cartController.ts
│   ├── orderController.ts
│   └── uploadController.ts  # File upload handling
├── middlewares/
│   └── authenticate.ts       # JWT authentication middleware
├── models/
│   ├── User.ts
│   ├── Category.ts
│   ├── Product.ts
│   ├── Cart.ts
│   └── Order.ts
├── routes/
│   ├── auth.ts
│   ├── users.ts
│   ├── admin.ts
│   ├── categoryRoutes.ts
│   ├── productRoutes.ts
│   ├── cartRoutes.ts
│   ├── orderRoutes.ts
│   └── uploadRoutes.ts
├── services/
│   └── emailService.ts      # Email notification service
├── app.ts                   # Express app setup
└── index.ts                 # Server entry point
```

## Security Features
- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes with authentication middleware
- Token expiration (7 days)
- Password reset with time-limited tokens
- User-specific cart and order operations
- File type and size validation
- Role-based access control

## Access Control
- **Public**: View categories and products
- **Customer**: Default role, access cart and order operations
- **Vendor**: Create, update, delete own products
- **Admin**: Full access including user management and order status updates

## License
MIT