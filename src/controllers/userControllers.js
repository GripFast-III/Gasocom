// Contient la logique metier (ajouter, modifier, supprimer un utilisateur)

const { users } = require("../models/userModel");

// 1. Create a new user
const createUser = (req, res) => {
  const { name, email } = req.body;

  // Verifications
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

// ✅ 2. Get users' list
const getUsers = (req, res) => {
  res.json(users);
};

// ✅ 3. Get a specific user
const getUserById = (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

// ✅ 4. User update
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

// ✅ 5. Delete user
const deleteUser = (req, res) => {
  const index = users.findIndex((user) => user.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "User not found." });
  }

  users.splice(index, 1);
  res.status(204).send(); // 204 = No Content
};

// Routes functions export
module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
