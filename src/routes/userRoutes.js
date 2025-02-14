//Routes toward API

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: "Add a new user"
 *     description: "Create a new user in the system."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       201:
 *         description: "User successfully created"
 *       400:
 *         description: "Missing or invalid data"
 */
router.post("/", userController.createUser); // Create a new user

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: "Get all users"
 *     description: "Retrieve the list of all users in the system."
 *     responses:
 *       200:
 *         description: "List of users"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 */
router.get("/", userController.getUsers); // Get all users

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: "Get a specific user"
 *     description: "Retrieve the details of a specific user by ID."
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: "ID of the user to retrieve"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "User details"
 *       404:
 *         description: "User not found"
 */
router.get("/:id", userController.getUserById); // Get a specific user

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: "Update a user"
 *     description: "Update the information of an existing user."
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: "ID of the user to update"
 *         schema:
 *           type: string
 *       - name: user
 *         in: body
 *         required: true
 *         description: "New user information"
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - email
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *               format: email
 *     responses:
 *       200:
 *         description: "User successfully updated"
 *       400:
 *         description: "Invalid data"
 *       404:
 *         description: "User not found"
 */
router.put("/:id", userController.updateUser); // Update a user

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: "Delete a user"
 *     description: "Delete a user from the system by ID."
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: "ID of the user to delete"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "User successfully deleted"
 *       404:
 *         description: "User not found"
 */
router.delete("/:id", userController.deleteUser); // Delete a user

// Exemple de route
router.get("/", (req, res) => {
  res.send("Liste des utilisateurs");
});
module.exports = router;
