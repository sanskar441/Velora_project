const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authenticateUser } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

router.post("/", authenticateUser, authorizeRoles("super_admin", "admin"), userController.createUser);

router.get("/", authenticateUser, authorizeRoles("super_admin", "admin"), userController.getAllUsers);

router.put("/:id", authenticateUser, authorizeRoles("super_admin", "admin"), userController.updateUser);

router.delete("/:id", authenticateUser, authorizeRoles("super_admin", "admin"), userController.deleteUser);

module.exports = router;