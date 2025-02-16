// Application entry point
const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const userRoutes = require("./src/routes/userRoutes");
const connectDB = require("./src/config/db"); // Connexion to MongoDB

const app = express();
app.use(express.json()); // Enable JSON body parsing

connectDB(); // Call the function to connect to the data base

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User management API",
      version: "1.0.0",
      description: "API for managing users in a system",
    },
  },
  apis: ["./src/routes/userRoutes.js"], // Files with Swagger comments
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Routes
app.use("/usuarios", userRoutes);
/*app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
*/

// Server starter
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
