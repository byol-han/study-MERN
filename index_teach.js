const express = require("express"); // Import Express to create server
const mongoose = require("mongoose"); // Import Mongoose for MongoDB connection
const cors = require("cors"); // Import CORS to enable cross-origin requests  <== this is for later use

let name = "zahy";

name = "zahy2"; // Change the value of name variable

require("dotenv").config(); // Load environment variables from .env file  <-- we will use this later

const app = express(); // Create Express app
const PORT = process.env.PORT || 5000; // Use port from environment or default to 5000

// Middleware to enable CORS and parse JSON in request bodies
app.use(cors());
app.use(express.json());

// Define a simple route to test the server

//If GET req to  www.mywebsite.com then do something (run a specific function)

app.get("/users", (req, res) => {
  console.log(req.headers);
  res.send("Backend server is running " + name);
});

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// these are comments... these are ignored by the code interpreter

// Connect to MongoDB using Mongoose

// this is me defining a function to handle errors

// this function will not run unless I "call" it somewhere in the code or use it as middleware

function errorHandler(err, req, res, next) {
  console.error("Error occurred:", err.message);
  res.writeHead(500, { "Content-Type": "text/plain" });
  res.end("Internal Server Error");
}

function logger(req, res, next) {
  console.log(`Request: ${req.method} ${req.url}`);
  next(); // Continue to the next middleware
}

function checkAuth(req, res, next) {
  const isAuthenticated = true; // This could be a real authentication check

  if (isAuthenticated === false) {
    console.log("Unauthorized access attempt");
    res.writeHead(401, { "Content-Type": "text/plain" });
    res.end("Unauthorized");
  } else {
    next(); // If authenticated, continue to the next middleware
  }
}

app.use(logger); // Use the logger middleware for all routes
app.use(checkAuth); // Use the authentication check middleware for all routes

app.use("/admin", (req, res, next) => {
  console.log("Admin section accessed");
  //res.end('Admin section is under construction');
  next();
});

app.get("/admin", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  console.log(" u see this in terminal");
  res.end("Welcome to the admin section");
});

//DYNAMIC ROUTES

app.get("/users/:userid", (req, res) => {
  const userId = req.params.userid; // Extract the "userid" parameter
  res.send(`User ID: ${userId}`);
});

app.get("/products/:category/:productId", (req, res) => {
  const category = req.params.category; // Access the "category" parameter
  const productId = req.params.productId; // Access the "productId" parameter
  res.send(`Category: ${category}, Product ID: ${productId}`);
});

app.get("/posts/:year/:month", (req, res) => {
  const year = req.params.year;
  const month = req.params.month;
  if (month) {
    res.send(`Posts from ${month}/${year}`);
  } else {
    res.send(`Posts from the year ${year}`);
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
