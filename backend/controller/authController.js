// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.status(201).send({ message: "User  registered", user });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send("User  not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User  not found");
    res.json({
        message: "User found",
        user,
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const updatedUser  = await User.findByIdAndUpdate(
      req.params.id,
      { username, password: hashedPassword, role },
      { new: true }
    );

    if (!updatedUser ) return res.status(404).send("User  not found");
    res.json(updatedUser);

    res.json({
        message: "User updated successfully",
        user: updatedUser,
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const deletedUser  = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser ) return res.status(404).send("User  not found");
    res.status(204).send("User deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
};