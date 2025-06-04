// Import libraries
const express = require("express"); // Import Express to create server
const mongoose = require("mongoose"); // Import Mongoose for MongoDB connection
const cors = require("cors"); // Import CORS to enable cross-origin requests

require("dotenv").config(); // Load environment variables from .env file

const app = express(); // Create Express app
const PORT = process.env.PORT || 5000; // Use port from environment or default to 5000

// Middleware to enable CORS and parse JSON in request bodies
app.use(cors());
app.use(express.json());

// Define a simple route to test the server

//If GET req to www.mywebsite.com then do something (run a specific function)

app.get("/", (req, res) => {
  console.log(req.headers);
  res.send("Backend server is running");
});

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
