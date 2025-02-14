//Point d'entrée de l'application

const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});

const express = require("express");
const app = express();
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User management API",
      version: "1.0.0",
      description: "This API allows us to manage users (CRUD)",
    },
  },
  apis: ["./index.js"], // Files with Swagger comments
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Uses swagger-ui-express to serve the API's documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
