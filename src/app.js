// Express and Swagger initialisation
const express = require("express");

const app = express();
app.use(express.json()); // Allow to red json format in the requests

// Import users' routes
const userRoutes = require("./routes/userRoutes");
app.use("/usuarios", userRoutes);

module.exports = app;
