import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Middleware for CORS (optional)
app.use((req: Request, res: Response, next: Function) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

interface User {
  email: string;
  name: string;
  stack: string;
}

interface ApiResponse {
  status: string;
  user: User;
  timestamp: string;
  fact: string;
}

app.get('/me', async (req: Request, res: Response<ApiResponse>) => {

  // My Profile
  const user: User = {
    email: "felixgogodae777@gmail.com", 
    name: "Felix Gogodae", 
    stack: "Node.js (Express)"
  };

  try {
    
    // Fetch cat fact with timeout
    const response = await axios.get('https://catfact.ninja/fact', { timeout: 5000 });
    const fact: string = response.data.fact;

    // Current UTC timestamp in ISO 8601 format
    const timestamp: string = new Date().toISOString();

    // Log the request
    console.log(`[${timestamp}] Request to /me`);

    // Send response
    res.json({
      status: "success",
      user,
      timestamp,
      fact
    });
  } catch (error: any) {
    console.error('Error fetching cat fact:', error.message);

    // Return error response
    const timestamp: string = new Date().toISOString();

    // Log the error
    console.log(`[${timestamp}] Error fetching cat fact`);

    res.status(502).json({
      status: "error",
      user,
      timestamp,
      fact: "Unable to fetch cat fact at this time."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});