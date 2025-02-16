// Contient la logique métier (ajouter, modifier, supprimer un utilisateur)

const User = require("../models/userModel"); // Import the MongoDB model

// 1. Create a new user
const createUser = async (req, res) => {
  const { name, email } = req.body;

  // Check format
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  // Validity check
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "This email is already used." });
    }

    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// 2. Get a list of all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

// 3. Get a sepcific user with the help of his ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

// 4. Updating a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (email && email !== user.email) {
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        return res.status(400).json({ message: "This email is already used." });
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

// 5. Deleting a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await user.remove();
    res.status(204).send(); // 204 = No Content
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

// Exports the Routes' functions
module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
