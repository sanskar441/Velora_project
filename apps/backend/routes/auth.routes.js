const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authenticateUser } = require("../middleware/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);

router.post("/change-password", authenticateUser, authController.changePassword);
router.put("/update-details", authenticateUser, authController.updateDetails);
router.get("/me", authenticateUser, authController.getCurrentUser);

module.exports = router;