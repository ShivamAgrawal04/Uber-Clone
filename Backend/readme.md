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

```

## Response Status Codes
- **201 Created**: User successfully registered. Returns a JSON object containing the user's token and user details.
- **400 Bad Request**: Validation errors occurred (e.g., missing fields, invalid email format, password not strong enough, or user already exists).
- **500 Internal Server Error**: An unexpected error occurred on the server.

### Example Response for Successful Registration
```

json
{
"token": "your_jwt_token_here",
"user": {
"fullName": {
"firstName": "John",
"lastName": "Doe"
},
"email": "john.doe@example.com"
}
}

## Notes

- Ensure that the server is running and the database is connected before making requests to this endpoint.
- Use appropriate headers, such as `Content-Type: application/json`, when making the request.
