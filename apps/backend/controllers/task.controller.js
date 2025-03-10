const Task = require("../models/task.model");
const User = require("../models/user.model");


exports.createTask = async (req, res) => {
  try {
    const { title, description, assigned_to, project } = req.body;
    const task = new Task({ title, description, assigned_to, project });
    await task.save();
    res.status(201).json({ status: "success", message: "Task created", data: task });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
    if (!task) return res.status(404).json({ status: "error", message: "Task not found" });
    res.json({ status: "success", message: "Task updated", data: task });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getTasksForUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const tasks = await Task.find({ assigned_to: userId })
      .populate("project")
      .skip(skip)
      .limit(limit);

    if(tasks.length===0)
    {
    const admin = await User.find({_id : userId}) 
    if(admin[0].role === "admin" || admin[0].role === "super_admin"){
      const tasks = await Task.d()
      .populate("project")
      .skip(skip)
      .limit(limit);

      res.json({
        status: "success",
        message: "Tasks fetched successfully",
        count: tasks.length,
        data: tasks
      });
    }
    }
    const total = await Task.countDocuments({ assigned_to: userId });
    
    res.json({
      status: "success",
      message: "Tasks fetched successfully",
      count: tasks.length,
      total,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getTasksForAdminAndSAdmin = async (req, res) => {
  try {
    const { id, role } = req.user;
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    let tasks, total;

    if (role === "admin" || role === "super_admin") {
      tasks = await Task.find({})
        .populate("project")
        .skip(skip)
        .limit(limit);
      total = await Task.countDocuments({});
    } else {
      tasks = await Task.find({ assigned_to: id })
        .populate("project")
        .skip(skip)
        .limit(limit);
      total = await Task.countDocuments({ assigned_to: id });
    }

    res.json({
      status: "success",
      message: "Tasks fetched successfully",
      count: tasks.length,
      total,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!task) return res.status(404).json({ status: "error", message: "Task not found" });
    res.json({ status: "success", message: "Task updated successfully", data: task });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ status: "error", message: "Task not found" });
    res.json({ status: "success", message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};