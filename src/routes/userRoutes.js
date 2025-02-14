//Contient les routes de l'API

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.post("/", userController.createUser); // Créer un utilisateur
router.get("/", userController.getUsers); // Récupérer tous les utilisateurs
router.get("/:id", userController.getUserById); // Récupérer un utilisateur spécifique
router.put("/:id", userController.updateUser); // Modifier un utilisateur
router.delete("/:id", userController.deleteUser); // Supprimer un utilisateur

// Exemple de route
router.get("/", (req, res) => {
  res.send("Liste des utilisateurs");
});
module.exports = router;
