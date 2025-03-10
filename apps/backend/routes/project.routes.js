const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const { authenticateUser } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

router.post("/", authenticateUser, authorizeRoles("super_admin", "admin"), projectController.createProject);
router.get("/", authenticateUser, authorizeRoles("super_admin", "admin"), projectController.getAllProjects);
router.get("/myproject", authenticateUser, projectController.getUserProjects);
router.put("/:id", authenticateUser, authorizeRoles("super_admin", "admin"), projectController.updateProject);
router.delete("/:id", authenticateUser, authorizeRoles("super_admin", "admin"), projectController.deleteProject);

module.exports = router;