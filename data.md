# API Documentation

## Categories

### POST /api/categories

```json
{
    "name": "Electronics",
    "description": "Electronic devices and gadgets"
}
```

### GET /api/categories
Returns all categories

### GET /api/categories/:id
Returns category by ID

### PUT /api/categories/:id
```json
{
    "name": "Updated Electronics",
    "description": "Updated description"
}
```

### DELETE /api/categories/:id
Deletes category by ID

## Products

### POST /api/products
```json
{
    "name": "iPhone 15",
    "price": 999.99,
    "description": "Latest iPhone model",
    "categoryId": "category-uuid-here",
    "inStock": true,
    "quantity": 50
}
```

### GET /api/products
Returns all products

### GET /api/products/:id
Returns product by ID

### PUT /api/products/:id
```json
{
    "name": "iPhone 15 Pro",
    "price": 1199.99,
    "description": "Updated iPhone model",
    "categoryId": "category-uuid-here",
    "inStock": true,
    "quantity": 30
}
```

### DELETE /api/products/:id
Deletes product by ID

## Cart

### POST /api/cart
```json
{
    "items": [
        {
            "id": "item-1",
            "productId": "product-uuid-here",
            "quantity": 2
        }
    ]
}
```

### GET /api/cart
Returns all carts

### GET /api/cart/:userId
Returns cart by user ID

### PUT /api/cart/:userId
```json
{
    "items": [
        {
            "product": "product1",
            "quantity": 2
        },
        {
            "product": "product2",
            "quantity": 1
        }
    ]
}

```
### POST /api/products
```json
{
  {
  "name": "HeadPhones4",
  "price": 200,
  "description": "Headphone4",
  "category":"Speaker",
  "inStock": true,
  "quantity": 5
}
}
```

### POST /api/categories
```json

  {
  "name": "Car",
  "description": "Range Rover"
}
```
name: string;
  description?: string;

### DELETE /api/cart/:userId
Deletes cart by user ID