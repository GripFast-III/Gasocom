//Defines the structure of the data
/*
let users = []; // Array that will stock users
let idCounter = 1; // ALlow to create unique Ids

module.exports = { users, idCounter };
*/

const mongoose = require("mongoose");

// Define the schema for user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures the email is unique
  },
});

// Create the mongoose model from the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
