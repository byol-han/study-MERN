// Import libraries
const express = require("express"); // Import Express to create server
const mongoose = require("mongoose"); // Import Mongoose for MongoDB connection
const cors = require("cors"); // Import CORS to enable cross-origin requests

require("dotenv").config(); // Load environment variables from .env file

const app = express(); // Create Express app
const PORT = process.env.PORT || 5000; // Use port from environment or default to 5000

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Middleware to enable CORS and parse JSON in request bodies
app.use(cors());
app.use(express.json());

// this is me defining a function to handle errors

// this function will not run unless I "call" it somewhere in the code or use it as middleware
function errorHandler(err, req, res, next) {
  console.error("Error occurred:", err.message);
  res.writeHead(500, { "Content-Type": "text/plain" });
  res.end("Internal Server Error");
}

// Define a simple route to test the server
// 1. Logger Middleware
function logger(req, res, next) {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
}

// 2. Authentication Middleware
function checkAuth(req, res, next) {
  const isAuthenticated = true; // This could be a real authentication check
  if (!isAuthenticated) {
    res.status(401).send("Unauthorized");
    return; // Stop further processing if not authenticated
  }
  next(); // If authenticated, continue to the next middleware
}

// 3. Route Handler Middleware
function RouteHandlers(req, res, next) {
  if (req.url === "/admin") {
    res.send("Welcome to the admin page!");
  } else if (req.url === "/user") {
    res.send("Welcome to the user page!");
  } else next(); // Call next to pass control to the next middleware
}

app.use(logger);
app.use(checkAuth);

// //If GET req to www.mywebsite.com then do something (run a specific function)
app.get("/", (req, res) => {
  console.log(req.headers);
  res.send("Backend server is running");
});

app.use(RouteHandlers);

// // Dynamic route
app.get("/users/:userid", (req, res) => {
  const userId = req.params.userid; // Extract the "id" parameter
  res.send(`User ID: ${userId}`);
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.use(errorHandler); // at the end of the middleware stack

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
