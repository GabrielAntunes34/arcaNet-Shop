# API MANUAL

## Description

This is a RESTFUL API was created to connect ArcNet's frontend to it's database, by the deffinition of a series of routes and controllers.

The database was made in MongoDb and the Backend code with Node.js and Express

### Entity's at the database

- Product

    ```js
    Product: {
        id: ObjectId    // (but it'll become a string in return)
        name: string,
        description: String,
        photo: String,
        price: Number (float),
        stock: Number (int),
        sold: Number (int),
        highlighted: bool,
        categories: [Object(id)]
    };
    ```

- Category

    ```js
    Category: {
        id: ObjectId    // (but it'll become a string in return)
        name: String
    };
    ```

- User

    ```js
    User: {
        id: ObjectId    // (but it'll become a string in return)
        name: String,
        email: String,
        address: String,
        phone: String,
        role: String,       // (client or admin)
        password: String
    };
    ```

- Cupon

    ```js
    Cupon: {
        id: ObjectId    // (but it'll become a string in return)
        discount: Number,
        expiresAt: Date,
        valid: Boolean,
        used: Boolean,
        userId: ObjectId // References 1 User
    };
    ```

### API Return pattern

Almost every route will return The following Json as the response's data:

```js
data: {
    message: '',
    data: Object,
    details: '',
};
```

Message will always say 'Success' if the operation fetched was completed, bu if an error occured, it will have a proper response, and details mwy be fullfield with information for debug.

The only route that breaks this is GET /auth/logout, which has Response status 204, not returning anything.

Finally, it's important to mention that the user's routes won't return their password at any case, since it's unnecessary for the front-end, may be insecure and the password is hashed at the database!


## Routes

### Authentication:

| Method | Path | Data at body | data returned | Need auth |
|--------|------|--------------|---------------|-----------|
| POST   | /auth/login | email, password | Auth JWT token | No |
| POST   | /auth/register | user data | Nothing | No |
| GET    | /auth/logout | Nothing | Nothing | Yes |

Remembering that JWT will be automatically set in the client's browser after login, while logout will send an header to take it out. The only other manner of logout occurs when a user passes the token's expiration time.

### Payment:

| Method | Path | Data at body | data returned | Need auth |
|--------|------|--------------|---------------|-----------|
| POST   | / | [ {id, quantityToAdd}] | Nothing | Yes |

This route will release the payment of an authenticated user who's buying some products, decrementing the quantity from stock and incrementind in sold attributes. It must recieve an list with a pair ```< productId : quantityToId >``` for each purchased product. This reduced info will make it easier and relatively more lightweight.

### Fortune (Cupon):

| Method | Path | Data at body | data returned | Need auth |
|--------|------|--------------|---------------|-----------|
| GET    | /draw | Nothing | List of three card numbers | Yes |
| GET    | /claim | Nothing | Cupon JWT token | Yes |

This are the routes to play Wheel Of Fortune game. The first one choose three random numbers from 1 to 9 and if the three of them are equal, we update the user's cupon to a valid one with the number's discount times 5. The second, checks if the user dosen't already have a cupon token and, if his cupon is valid, generates it's token to applay in the total value of a purchase.

The game (and this code) has some rules:
- Every user has **only one** cupon.
- Once created the cupon isn't erased unless the user's account is deleted. Therefore, the cupon is only altered at each play.
- valid Cupons and tokens will only last one day.

### User:

| Method | Path | Data at body | data returned | Need auth |
|--------|------|--------------|---------------|-----------|
| GET    | /user/me | Nothing | User | Yes |
| PUT    | /user/me | {name, address, phone} | User | Yes |
| DELETE | /user/me | Nothing | Nothing | Yes |
| GET    | /user/ | Nothing | User list | Yes |
| GET    | /user/:id | Nothing | User | Yes |
| POST   | /user/ | User data | Nothing | Yes |
| PUT    | /user/:id | updated fields | User | Yes |
| DELETE | /user/:id | Nothing | Nothing | Yes |

The /me routes were made to create an horizontal access control for the front end's profile page. They chcek you're token's id and compare with the ones at the data base to verify if the user is really himself. Therefore, they only return information from the logged user especified.

### Product:

| Method | Path | Data at body | data returned | Need auth |
|--------|------|--------------|---------------|-----------|
| GET    | /product/ | Nothing | Product list | No |
| GET    | /product/:id | Nothing | Product | No |
| POST   | /product/ | Product data | Nothing | Yes |
| PUT    | /product/:id | updated fields | Product | Yes |
| DELETE | /product/:id | Nothing | Nothing | Yes |

The Read product routes can have a parameter set to retrieve all the products with their categories data, instead of only returning their Id's.

```
GET /product?withCategories=true
GET /product/:id?withCategories=true
```

### Category:

| Method | Path | Data at body | data returned | Need auth |
|--------|------|--------------|---------------|-----------|
| GET    | /category/ | Nothing | Category list | No |
| GET    | /category/:id | Nothing | Category | No |
| POST   | /category/ | Category data | Nothing | Yes |
| PUT    | /category/:id | updated fields | Category | Yes |
| DELETE | /category/:id | Nothing | Nothing | Yes |

The Delete operation in Category will also take all it's references from the products
that had them. The product, however, may exist without any category.

## Could be implemented in the future:

* The backend dosen't recieve our return image files for products

* Cupon has CRUD operations and routes defined, but it's not integrated with Fortune routes and isn't used in the code yet (There isn't pages for it at the front end yet)

* Payment dosen't use cupons yet. It could check if the user has a valid cupon (verify valid attibute, date and token's vality) to return the final discounted price

