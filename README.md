<p align="center">
  <img src="https://static.wixstatic.com/media/3ba736_be1f7ac0f8bf4e049a5fb6616b18d827~mv2_d_1937_1405_s_2.png/v1/fill/w_220,h_140,al_c,q_85,usm_0.66_1.00_0.01/Regov%20Technologies%202%20PNG_edited.webp" width="200">
</p>

# { "developer": "Back-end" }

Hey! We are excited that you are interested in joining the team at Regov Technologies.

We feel that the best place to really show us your skills is somewhere you feel comfortable. This test should not take you a long amount of time to complete.

This take home test is used to determine how you go about solving problems logically, as well as building out easy to use, API End points. This test is very open to interpretation and implementation.

## First time use

- Install dependencies :

  ```
  npm install 
  ```

- Create a `.env` file with theses values :
  
  ```
  PORT=3000
  TOKEN_SECRET=SECRET
  ```

- Configure database in config/config.json, in this case we use dev :

  ```js
  {
    "development": {
      "username": "root",
      "password": null,
      "database": "regov-backend-test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    ...
  }

  ```

- Run db migration and seeder

  ```
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
  ```

- Run the project

  ```
    npm run dev
  ```

## Authenticating

- Register
  - Auth : None
  - Method: POST
  - Endpoint : /auth/register
  - Params: 
    ```json
    {
      "email": "your-email@test.com",
      "password": "password"
    }
    ```
  - Response
    ```json
    {
      "message": "Signup successful",
      "user": {
          "id": 127,
          "email": "test@test.com",
          "updatedAt": "2020-08-21T16:30:15.759Z",
          "createdAt": "2020-08-21T16:30:15.759Z"
      }
    }
    ```

- Login
  - Auth : None
  - Method : POST
  - Endpoint : /auth/login
  - Params: 
    ```json
    {
      "email": "your-email@test.com",
      "password": "password"
    }
    ```
  - Response
    ```json
    {
        "token": "YOUR-JWT-TOKEN"
    }
    ```

- Logout
  - Auth : JWT
  - Method : GET
  - Endpoint : /auth/logout
  - Response
    ```json
    OK
    ```

## Resource

- Product
  - Params : 
    ```json
    {
      "name": "Product Name",
      "desc": "Product Description"
    }
    ```
  - Endpoint :
    - List - `GET products`
    - Create - `POST products`
    - Find by ID - `GET products/{id}`
    - Update - `PUT products/{id}`
    - Delete - `DELETE products/{id}`

- Warehouse
  - Params : 
    ```json
    {
      "name": "Warehouse Name",
      "desc": "Warehouse Description"
    }
    ```
  - Endpoint :
    - List - `GET warehouse`
    - Create - `POST warehouse`
    - Find by ID - `GET warehouse/{id}`
    - Update - `PUT warehouse/{id}`
    - Delete - `DELETE warehouse/{id}`

- Stocks
  - Params : 
    ```json
    {
      "amount": 10
    }
    ```
  - Endpoint :
    - Get Stock of Product in Warehouse - `GET warehouse/{:warehouseID}/stocks/{productID}`
    - Add Stock (Restock) of Product in Warehouse - `POST warehouse/stocks/{productId}`
    - Reduce Stock (Unstock) of Product in Warehouse - `POST warehouse/unstocks/{productId}`
  
