//Initialise Express et Swagger
const express = require("express");

const app = express();
app.use(express.json()); // Permet de lire du JSON dans les requêtes

// Importer les routes des utilisateurs
const userRoutes = require("./routes/userRoutes");
app.use("/usuarios", userRoutes);

module.exports = app;
