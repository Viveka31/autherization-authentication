# User Authentication & Authorization API

This project implements **User Authentication and Authorization using Bearer Token (JWT)** using Node.js, Express.js and MongoDB. The application follows the **MVC architecture** and provides secure API endpoints for user registration, login and protected profile access.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Postman
- Deployment: Render

## Deployment URL

https://autherization-authentication.onrender.com/

Note: The application is deployed on Render free tier. The first request may take 30–60 seconds because the service sleeps when idle.

## API Endpoints

### 1. Register User

POST /api/users/register

Request Body

```json
{
 "username": "testuser",
 "email": "test@example.com",
 "password": "123456"
}
