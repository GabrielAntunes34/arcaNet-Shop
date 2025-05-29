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
        description: string,
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
        name: string
    };
    ```

- User

    ```js
    User: {
        id: ObjectId    // (but it'll become a string in return)
        name: string,
        email: string,
        address: string,
        phone: string,
        role: string,       // (client or admin)
        password: string
    };
    ```

- Cupon

    Not completely defined yet.

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
| POST   | /auth/login | email, password | JWT token | No |
| POST   | /auth/register | user data | Nothing | No |
| GET    | /auth/logout | Nothing | Nothing | Yes |

Remembering that JWT will be automatically set in the client's browser after login, while logout will send an header to take it out. The only other manner of logout occurs when a user passes the token's expiration time.

### User:

| Method | Path | Data at body | data returned | Need auth |
|--------|------|--------------|---------------|-----------|
| GET    | /user/ | Nothing | user list | Yes |
| GET    | /user/:id | Nothing | user | Yes |
| POST   | /user/ | User data | Nothing | Yes |
| PUT    | /user/:id | updated fields | user | Yes |
| DELETE | /user/:id | Nothing | Nothing | Yes |


### Product:

| Method | Path | Data at body | data returned | Need auth |
|--------|------|--------------|---------------|-----------|
| GET    | /product/ | Nothing | product list | No |
| GET    | /product/:id | Nothing | product | No |
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
| GET    | /category/ | Nothing | category list | No |
| GET    | /category/:id | Nothing | product | No |
| POST   | /category/ | Product data | Nothing | Yes |
| PUT    | /category/:id | updated fields | Product | Yes |
| DELETE | /category/:id | Nothing | Nothing | Yes |

The Delete operation in Category will also take all it's references from the products
that had them. The product, however, may exist without any category.