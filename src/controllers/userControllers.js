//Contient la logique metier (ajouter, modifier, supprimer un utilisateur)

const { users } = require("../models/userModel");

// ✅ 1. Créer un nouvel utilisateur
const createUser = (req, res) => {
  const { name, email } = req.body;

  // Vérifications
  if (!name || !email) {
    return res.status(400).json({ message: "Name and mail required." });
  }

  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ message: "This mail is already used." });
  }

  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};

// ✅ 2. Obtenir la liste des utilisateurs
const getUsers = (req, res) => {
  res.json(users);
};

// ✅ 3. Obtenir un utilisateur spécifique
const getUserById = (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

// ✅ 4. Mettre à jour un utilisateur
const updateUser = (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const { name, email } = req.body;
  if (email && users.some((u) => u.email === email && u.id !== user.id)) {
    return res.status(400).json({ message: "This mail is already used." });
  }

  user.name = name || user.name;
  user.email = email || user.email;

  res.json(user);
};

// ✅ 5. Supprimer un utilisateur
const deleteUser = (req, res) => {
  const index = users.findIndex((user) => user.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Utilisateur non trouvé." });
  }

  users.splice(index, 1);
  res.status(204).send(); // 204 = No Content
};

// Export des fonctions pour les routes
module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
