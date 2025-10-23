const express = require("express");
const router = express.Router();

const {
  requestPasswordReset,
  resetPassword,
} = require("../controllers/passwordController.js");

// Step 1: User requests a password reset link
router.post("/forgot-password", requestPasswordReset);

// Step 2: User clicks the link and submits new password
router.post("/reset-password/:token", resetPassword);

module.exports = router;
