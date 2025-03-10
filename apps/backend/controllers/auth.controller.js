const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ status: "error", message: "User already exists" });
    
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials: Email not found",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials: Incorrect password",
      });
    }

    console.log('role: ', role);
    console.log('user.role: ', user.role);
    if (role && user.role !== role) {
      return res.status(401).json({
        status: "error",
        message: "Role mismatch. Please login with the correct role",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      status: "success",
      message: "Login successful",
      data: { token, user },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ status: "error", message: "User not found" });
    
    res.json({ status: "success", message: "Reset link sent to your email" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ status: "error", message: "User not found" });
    
    if (user.password !== oldPassword) {
      return res.status(400).json({ status: "error", message: "Old password is incorrect" });
    }
    
    user.password = newPassword;
    await user.save();
    res.json({ status: "success", message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.updateDetails = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ status: "error", message: "User not found" });
    
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();
    res.json({ status: "success", message: "User details updated successfully", data: user });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ status: "error", message: "User not found" });
    res.json({ status: "success", data: user });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};