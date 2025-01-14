# User Registration Endpoint Documentation

## Endpoint

`POST /api/user/register`

## Description

This endpoint allows a new user to register by providing their full name, email, and password. It validates the input data and creates a new user in the database if the data is valid and the user does not already exist.

## Required Data

The request body must be in JSON format and include the following fields:

- **fullName**: An object containing:
  - **firstName**: (String) Required. Must be at least 3 characters long.
  - **lastName**: (String) Optional. Must be at least 3 characters long.
- **email**: (String) Required. Must be a valid email address and unique.
- **password**: (String) Required. Must meet strong password criteria (at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 symbol).

### Example Request Body

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "StrongP@ssw0rd"
}
```

## Response Status Codes

- **201 Created**: User successfully registered. Returns a JSON object containing the user's token and user details.
- **400 Bad Request**: Validation errors occurred (e.g., missing fields, invalid email format, password not strong enough, or user already exists).
- **500 Internal Server Error**: An unexpected error occurred on the server.

### Example Response for Successful Registration

```json
{
  "token": "your_jwt_token_here",
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "hased_password"
  }
}
```

## Notes

- Ensure that the server is running and the database is connected before making requests to this endpoint.
- Use appropriate headers, such as `Content-Type: application/json`, when making the request.

# User Login Endpoint Documentation

## Endpoint

`POST /api/user/login`

## Description

This endpoint allows an existing user to log in by providing their email and password. It authenticates the user and returns a token if the credentials are valid.

## Required Data

The request body must be in JSON format and include the following fields:

- **email**: (String) Required. Must be a valid email address.
- **password**: (String) Required. The password associated with the user's account.

### Example Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "StrongP@ssw0rd"
}
```

## Response Status Codes

- **200 OK**: User successfully authenticated. Returns a JSON object containing the user's token and user details.
- **401 Unauthorized**: Authentication failed due to invalid email or password.
- **500 Internal Server Error**: An unexpected error occurred on the server.

### Example Response for Successful Login

```json
{
  "token": "your_jwt_token_here",
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "hased_password"
  }
}
```

## Notes

- Ensure that the server is running and the database is connected before making requests to this endpoint.
- Use appropriate headers, such as `Content-Type: application/json`, when making the request.

# User Profile Endpoint Documentation

## Endpoint

`GET /api/user/profile`

## Description

This endpoint allows an authenticated user to retrieve their profile information. The user must be logged in and provide a valid token.

## Response Status Codes

- **200 OK**: User profile successfully retrieved. Returns a JSON object containing the user's details.
- **401 Unauthorized**: Authentication failed due to missing or invalid token.
- **500 Internal Server Error**: An unexpected error occurred on the server.

### Example Response for Successful Profile Retrieval

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com"
}
```

## Notes

- Ensure that the server is running and the database is connected before making requests to this endpoint.
- Use appropriate headers, such as `Content-Type: application/json` and `Authorization: Bearer <token>`, when making the request.

# User Logout Endpoint Documentation

## Endpoint

`GET /api/user/logout`

## Description

This endpoint allows an authenticated user to log out. It clears the user's session token and adds it to a blacklist to prevent further use.

## Response Status Codes

- **200 OK**: User successfully logged out.
- **500 Internal Server Error**: An unexpected error occurred on the server.

## Notes

- Ensure that the server is running and the database is connected before making requests to this endpoint.
- Use appropriate headers, such as `Content-Type: application/json` and `Authorization: Bearer <token>`, when making the request.

# Captain Registration Endpoint Documentation

## Endpoint

`POST /api/captain/register`

## Description

This endpoint allows a new captain to register by providing their full name, email, password, and vehicle details. It validates the input data and creates a new captain in the database if the data is valid and the captain does not already exist.

## Required Data

The request body must be in JSON format and include the following fields:

- **fullName**: An object containing:
  - **firstName**: (String) Required. Must be at least 3 characters long.
  - **lastName**: (String) Optional. Must be at least 3 characters long.
- **email**: (String) Required. Must be a valid email address and unique.
- **password**: (String) Required. Must meet strong password criteria (at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 symbol).
- **vehicle**: An object containing:
  - **color**: (String) Required. Must be at least 3 characters long.
  - **plate**: (String) Required. Must be at least 3 characters long.
  - **capacity**: (Number) Required. Must be at least 1.
  - **vehicleType**: (String) Required. Must be one of: car, motorcycle, auto.

### Example Request Body

```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "StrongP@ssw0rd",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Response Status Codes

- **200 OK**: Captain successfully registered. Returns a JSON object containing the captain's token and details.
- **400 Bad Request**: Validation errors occurred (e.g., missing fields, invalid email format, password not strong enough, or captain already exists).
- **500 Internal Server Error**: An unexpected error occurred on the server.

### Example Response for Successful Registration

```json
{
  "token": "your_jwt_token_here",
  "captain": {
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "jane.doe@example.com",
    "password": "hased_password",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

# Captain Login Endpoint Documentation

## Endpoint

`POST /api/captain/login`

## Description

This endpoint allows an existing captain to log in by providing their email and password. It authenticates the captain and returns a token if the credentials are valid.

## Required Data

The request body must be in JSON format and include the following fields:

- **email**: (String) Required. Must be a valid email address.
- **password**: (String) Required. The password associated with the captain's account.

### Example Request Body

```json
{
  "email": "jane.doe@example.com",
  "password": "StrongP@ssw0rd"
}
```

## Response Status Codes

- **200 OK**: Captain successfully authenticated. Returns a JSON object containing the captain's token and details.
- **401 Unauthorized**: Authentication failed due to invalid email or password.
- **500 Internal Server Error**: An unexpected error occurred on the server.

### Example Response for Successful Login

```json
{
  "token": "your_jwt_token_here",
  "captain": {
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "jane.doe@example.com",
    "password": "hased_password",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```
