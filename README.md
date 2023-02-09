# RESTful-e-comerce-API
Simple RESTful Api for e-comerce made in NodeJs using MongoDB,mongoose,jwt for authorizaton and authentication

Open project in code editor,open terminal and type npm install.
Routes:


For register: 
POST http://localhost:3001/users

For login:
POST http://localhost:3001/users/login

Logout:
POST http://localhost:3001/users/logout

Add items:
POST http://localhost:3001/items

Get items:
GET http://localhost:3001/items

Get one item:
GET http://localhost:3001/items:id

Delete item:
DELETE  http://localhost:3001/items/id

Add to cart:
POST http://localhost:3001/cart

Get items from cart:
GET http://localhost:3001/cart

Delete from cart:
DELETE  http://localhost:3001/cart?itemId

Get orders:
GET http://localhost:3001/orders

Create order:
POST http://localhost:3001/order/checkout

