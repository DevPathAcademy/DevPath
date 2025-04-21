const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const validateInput = require("../middleswares/validateInput");
const validateRegisterFields = require("../middleswares/validateRegisterFields");

// Match new required fields: firstName, lastName, email, password, dob
router.post(
  "/register",
  validateInput(["firstName", "lastName", "email", "password", "dob"]),
  validateRegisterFields, // ✅ now validating formats + logic
  register
);
router.post("/login", validateInput(["email", "password"]), login);

module.exports = router;
