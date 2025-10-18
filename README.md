# HNG13 Stage One - Profile API

This project implements a simple RESTful API endpoint that returns profile information along with a dynamic cat fact fetched from an external API.

## Features

- GET `/me` endpoint returning JSON response
- Dynamic timestamp in ISO 8601 format
- Random cat fact from Cat Facts API (fetched fresh per request)
- Error handling with 502 Bad Gateway status on external API failure
- CORS support
- TypeScript for type safety
- Development server with auto-restart using nodemon

## Setup Instructions

1. **Clone the repository**

2. **Install dependencies:**
   ```
   yarn install
   ```

3. **Run the server:**
   ```
   yarn start
   ```

4. **Test the endpoint:**
   Open your browser or use a tool like curl/Postman to visit:
   ```
   http://localhost:3000/me
   ```

## Dependencies

- `express`: Web framework for Node.js
- `axios`: HTTP client for making requests to the Cat Facts API
- `typescript`: For TypeScript compilation
- `ts-node`: For running TypeScript directly in development
- `nodemon`: For auto-restarting the server on file changes
- `@types/express` and `@types/node`: Type definitions

## Environment Variables

No environment variables are required. The server runs on port 3000 by default, but you can set `PORT` if needed.

## API Documentation

### GET /me

Returns a JSON response with the following structure:

```json
{
  "status": "success",
  "user": {
    "email": "felixgogodae777@gmail.com",
    "name": "Felix Gogodae",
    "stack": "Node.js (Express)"
  },
  "timestamp": "Current UTC time in ISO 8601 format",
  "fact": "Random cat fact from Cat Facts API"
}
```

**Response Headers:**
- Content-Type: application/json

**Status Codes:**
- 200: Success
- 502: Bad Gateway (when Cat Facts API is unavailable)

## Notes

- The cat fact is fetched fresh on every request.
- If the external API fails, a 502 error is returned.
- Built with TypeScript for better code quality and maintainability.
- If the external API fails, a fallback cat fact is used.
- Update the `user` object in `server.js` with your actual details before running.