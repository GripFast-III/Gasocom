## User Management API

## _Description_

This API allows you to manage users: add, update, delete, and view users via simple HTTP requests. It is documented using Swagger.

## Prerequisites

Before running the project, make sure to have the following tools installed on your machine:

- Node.js (version 14 or higher)
- npm (for dependency management)

## Installing Dependencies

Clone this repository to your local machine:

```sh
git clone https://github.com/your-account/user-management-api.git
```

Navigate to the project folder:

```sh
cd user-management-api
```

Run the server locally using this command:

```sh
npm run start
```

This will launch the API on port 3000 (by default).

Once the server is running, you can access the interactive API documentation via Swagger by navigating to the following URL in your browser:

> http://localhost:3000/api-docs

This will allow you to view and test the various API routes directly from the Swagger interface.

## Running Basic API Tests

1- Create a User

- Method: POST
- URL: /usuarios
- Request Body:

```sh
{
    "name": "Jose Jose",
    "email": "josejose@example.com"
}
```

- Expected Response: Status Code 201, returns the created user

2- Get the List of Users

- Method GET
- URL: /usuarios
- Expected Response: Status Code 200, list of users

3- Get a Sepcific User by ID

- Method GET
- URL: /usuarios/{id}
- Expected Response: Status Code 200, user data

4- Update a user

- Method: PUT
- URL: /usuarios/{id}
- Request Body:

```sh
{
    "name": "Jose updated"
    "email": "joseupdated@example.com"
}
```

- Expected Response: Status Code 200, returns the updated user

5- Delete a User

- Method DELETE
- URL:/usuarios/{id}
- Expected Response: Status Code 204, successful deletion

To make the tests myself, I used Swagger UI on my machine with a local host (http://localhost:3000/api-docs/#/), as asked in the pitch, and also directly through VSCode with the extension Thunder Client.
I also could have used Postman but I am not very familiar with it.
