const { Router } = require("express");
const auth = Router();
const {
  register,
  login,
  deleteUserById,
  updateUserById,
  getUserById,
  getAllUsers,
} = require("../controller/authController.js");
const { validateRegister, validateLogin } = require("../validation/validate");

/**
 * @swagger
 *  tags:
 *   name: Auth
 *   description: Authentication management
 */

/**
 * @swagger
 *  /register:
 *    post:
 *      tags: [Auth]
 *      summary: Register a new user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *                role:
 *                  type: string
 *                  enum: [admin, user]
 *      responses:
 *        201:
 *          description: User registered successfully
 *        400:
 *          description: Invalid input
 */
auth.post("/register", validateRegister, register);

/**
 * @swagger
 *  /login:
 *    post:
 *      tags: [Auth]
 *      summary: Login a user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        200:
 *          description: User logged in successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                    example: your_jwt_token
 *                  role:
 *                    type: string
 *                    enum: [admin, user]
 *        400:
 *          description: Invalid credentials
 */
auth.post("/login", validateLogin, login);

/**
 * @swagger
 * /api/auth:
 *   get:
 *     tags: [Auth]
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   role:
 *                     type: string
 *                     enum: [admin, user]
 */
auth.get("/", getAllUsers);

/**
 * @swagger
 *  /api/auth/{id}:
 *    get:
 *      tags: [Auth]
 *      summary: Get a user by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: User ID
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: User found
 *        404:
 *          description: User not found
 */
auth.get("/:id", getUserById);

/**
 * @swagger
 *  /api/auth/{id}:
 *    put:
 *      tags: [Auth]
 *      summary: Update a user by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: User ID
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *                role:
 *                  type: string
 *                  enum: [admin, user]
 *      responses:
 *        200:
 *          description: User updated successfully
 *        404:
 *          description: User not found
 */
auth.put("/:id", updateUserById);

/**
 * @swagger
 *  /api/auth/{id}:
 *    delete:
 *      tags: [Auth]
 *      summary: Delete a user by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: User ID
 *          schema:
 *            type: string
 *      responses:
 *        204:
 *          description: User deleted successfully
 *        404:
 *          description: User not found
 */
auth.delete("/:id", deleteUserById);

module.exports = auth;

