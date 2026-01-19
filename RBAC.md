# Role-Based Access Control (RBAC) Implementation

## User Roles

### 1. Admin
**Description**: System administrator with full access

**Permissions**:
- ✅ Manage users (view, update, delete)
- ✅ Create, update, delete categories
- ✅ Create, update, delete any product
- ✅ Access all protected resources
- ✅ Manage carts

**Endpoints**:
- `GET /api/admin/users` - View all users
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update any product
- `DELETE /api/products/:id` - Delete any product

### 2. Vendor
**Description**: Seller who manages products

**Permissions**:
- ✅ Create products
- ✅ Update and delete only their own products
- ✅ View categories and products

**Restrictions**:
- ❌ Cannot manage users
- ❌ Cannot manage categories
- ❌ Cannot modify products created by other vendors
- ❌ Cannot access cart operations

**Endpoints**:
- `GET /api/categories` - View categories
- `GET /api/products` - View all products
- `POST /api/products` - Create product (auto-assigned to vendor)
- `PUT /api/products/:id` - Update own product only
- `DELETE /api/products/:id` - Delete own product only

### 3. Customer
**Description**: End user / buyer

**Permissions**:
- ✅ View categories and products
- ✅ Manage own cart (add, update, remove items)
- ✅ Manage own profile

**Restrictions**:
- ❌ Cannot create or manage products
- ❌ Cannot manage categories
- ❌ Cannot access other users' data

**Endpoints**:
- `GET /api/categories` - View categories
- `GET /api/products` - View products
- `GET /api/cart` - View own cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:id` - Update cart item
- `DELETE /api/cart/items/:id` - Remove cart item
- `DELETE /api/cart` - Clear cart
- `GET /api/users/profile` - View own profile
- `POST /api/users/change-password` - Change password

## Registration

When registering, users can specify their role:

```json
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "role": "customer"  // Options: "admin", "vendor", "customer" (default: "customer")
}
```

## Authentication

Login returns a JWT token with role information:

```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "role": "customer"
  }
}
```

## Authorization Flow

1. User authenticates and receives JWT token with role
2. Token is sent in Authorization header: `Bearer <token>`
3. `authenticate` middleware verifies token and extracts userId and role
4. `authorize` middleware checks if user's role has permission
5. For vendors, additional ownership checks are performed on products

## Product Ownership

- When a vendor creates a product, their `userId` is automatically stored as `vendorId`
- Vendors can only update/delete products where `vendorId` matches their `userId`
- Admins can update/delete any product regardless of `vendorId`

## Error Responses

- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Valid token but insufficient permissions
- `404 Not Found` - Resource doesn't exist or user doesn't own it

## Testing RBAC

### Create Admin User
```bash
POST /api/auth/register
{
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

### Create Vendor User
```bash
POST /api/auth/register
{
  "email": "vendor@example.com",
  "password": "vendor123",
  "role": "vendor"
}
```

### Create Customer User
```bash
POST /api/auth/register
{
  "email": "customer@example.com",
  "password": "customer123",
  "role": "customer"
}
```

## Implementation Files

- `src/models/User.ts` - Added role enum and field
- `src/models/Product.ts` - Added vendorId field
- `src/middlewares/authenticate.ts` - Extracts role from JWT
- `src/middlewares/authorize.ts` - Checks role permissions
- `src/controllers/auth.controller.ts` - Includes role in JWT
- `src/controllers/productController.ts` - Enforces product ownership
- `src/controllers/admin.controller.ts` - Admin user management
- `src/routes/admin.ts` - Admin-only routes
- `src/routes/categoryRoutes.ts` - Admin-only category management
- `src/routes/productRoutes.ts` - Admin/Vendor product management
- `src/routes/cartRoutes.ts` - Customer/Admin cart access
