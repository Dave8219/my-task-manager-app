const User = require("../models/User.js");

const crypto = require("crypto");

const { StatusCodes } = require("http-status-codes");

const { BadRequestError } = require("../errors");

const sendEmail = require("../utils/sendEmail");

// STEP 1: Request password reset
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Please provide a valid email");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("No account found with that email");
  }

  // Generate a random reset token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash it before saving to DB for security
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token and expiry (10 min)
  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  // Create reset URL (this would be your frontend)
  const resetURL = `http://localhost:5173/reset-password/${resetToken}`;

  // (Optional) Send reset email
  await sendEmail({
    to: user.email,
    subject: "Password Reset Request",
    text: `Reset your password here: ${resetURL}`,
    html: `<p>You requested a password reset.</p> <p>Click <a href="${resetURL}">here</a> to reset your password</p>`,
  });

  res.status(StatusCodes.OK).json({
    msg: "Password reset link generated.",
    resetURL, // just for testing — remove when sending real email
  });
};

// STEP 2: Reset password

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    throw new BadRequestError("Please provide a new password");
  }
  // Hash the token again to compare to DB
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // Find user with valid token
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    throw new BadRequestError("Token is invalid or expired");
  }

  // Update password (will be hashed automatically in your pre-save hook)
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(StatusCodes.OK).json({
    msg: "Password has been successfully reset.",
  });
};

module.exports = { requestPasswordReset, resetPassword };
