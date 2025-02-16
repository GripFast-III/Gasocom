// Contient la logique métier (ajouter, modifier, supprimer un utilisateur)

let users = []; // An array to stock users
let idCounter = 1; // Generate unique IDs

// 1. Create a new user
const createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  // Check if the mail already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "This email is already used." });
  }

  // Create a new user and add it into th array
  const newUser = { id: idCounter++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};

// 2. Get a list of all users
const getUsers = (req, res) => {
  res.json(users); // Just return the array of users
};

// 3. Get a sepcific user with the help of his ID
const getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  res.json(user);
};

// 4. Update user information
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  if (email && email !== user.email) {
    const emailExist = users.find((u) => u.email === email);
    if (emailExist) {
      return res.status(400).json({ message: "This email is already used." });
    }
  }

  user.name = name || user.name;
  user.email = email || user.email;

  res.json(user);
};

// 5. Delete user
const deleteUser = (req, res) => {
  const { id } = req.params;

  const index = users.findIndex((user) => user.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: "User not found." });
  }

  users.splice(index, 1); // Remove the user from the array
  res.status(204).send(); // 204 = No Content
};

// Exports the Routes' functions
module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
