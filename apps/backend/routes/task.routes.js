const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const { authenticateUser } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

// Tasks: Create (admin/super_admin), update status (employee/admin), list user tasks (with pagination), update and delete tasks
router.post("/", authenticateUser, authorizeRoles("super_admin", "admin"), taskController.createTask);
router.patch("/:id", authenticateUser, taskController.updateTaskStatus);
router.get("/mytasks", authenticateUser, taskController.getTasksForUser);
router.get("/getAllTasks", authenticateUser,authorizeRoles("super_admin", "admin"), taskController.getTasksForAdminAndSAdmin);
router.put("/:id", authenticateUser, authorizeRoles("super_admin", "admin"), taskController.updateTask);
router.delete("/:id", authenticateUser, authorizeRoles("super_admin", "admin"), taskController.deleteTask);

module.exports = router;