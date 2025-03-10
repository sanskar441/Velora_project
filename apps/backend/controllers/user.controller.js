const User = require("../models/user.model");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ status: "success", message: "User created", data: user });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Get the logged-in user's role
    const requestingUser = req.user;

    let filter = {};
    if (requestingUser.role === "admin") {
      // Admins can see only admins and employees, not super_admins
      filter = { role: { $ne: "super_admin" } };
    } // Super Admin can see all users, so no filter needed.

    const users = await User.find(filter);
    
    res.json({ 
      status: "success", 
      message: "Users fetched successfully", 
      count: users.length, 
      data: users 
    });

  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    // Update the user with the provided data; { new: true } returns the updated document
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }
    res.json({ status: "success", message: "User updated successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }
    res.json({ status: "success", message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};