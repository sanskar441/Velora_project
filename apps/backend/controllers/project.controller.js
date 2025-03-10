const Project = require("../models/project.model");
const User = require("../models/user.model");

exports.createProject = async (req, res) => {
  try {
    const { name, description, start_date, end_date, priority, employees } = req.body;
    const employeeIds = await User.find({ email: { $in: employees } }, "_id");

    if (employeeIds.length !== employees.length) {
      return res.status(400).json({
        status: "error",
        message: "One or more employee emails are invalid.",
      });
    }

    const project = new Project({
      name,
      description,
      start_date,
      end_date,
      priority,
      employees: employeeIds.map(user => user._id),
    });

    await project.save();

    res.status(201).json({
      status: "success",
      message: "Project created successfully",
      data: project,
    });

  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const projects = await Project.find()
      .populate("employees")
      .skip(skip)
      .limit(limit);
    const total = await Project.countDocuments();

    res.json({
      status: "success",
      message: "Projects fetched successfully",
      count: projects.length,
      total,
      data: projects
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getUserProjects = async (req, res) => {
  try {
    const userId = req.user.id; 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const projects = await Project.find({ employees: userId })
      .populate("employees", "name email role") 
      .skip(skip)
      .limit(limit);

    const total = await Project.countDocuments({ employees: userId });

    res.json({
      status: "success",
      message: "Projects fetched successfully",
      count: projects.length,
      total,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, req.body, { new: true });
    if (!project) return res.status(404).json({ status: "error", message: "Project not found" });
    res.json({ status: "success", message: "Project updated successfully", data: project });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) return res.status(404).json({ status: "error", message: "Project not found" });
    res.json({ status: "success", message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};