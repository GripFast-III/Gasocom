// Contient la logique metier (ajouter, modifier, supprimer un utilisateur)

const User = require("../models/userModel"); // Import the Mongoose User model

// 1. Create a new user
const createUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "This email is already used." });
    }

    // Create a new user and save it in the database
    const newUser = new User({ name, email });
    await newUser.save(); // MongoDB will automatically assign an ID

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 2. Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 3. Get a specific user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id); // Fetch user by ID from MongoDB
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 4. Update a user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const user = await User.findById(id); // Find user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the email is already in use (except for the current user)
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "This email is already used." });
      }
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 5. Delete a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id); // Delete user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(204).send(); // 204 = No Content (user deleted)
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
