const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fail = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const registerUser = async ({ name, email, password } = {}) => {
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    throw fail(400, "Name, email and password are required");
  }

  const cleanName = name.trim();
  const normalizedEmail = email.toLowerCase().trim();

  if (cleanName.length < 2 || cleanName.length > 50) {
    throw fail(400, "Name must be 2 to 50 characters");
  }

  if (!emailPattern.test(normalizedEmail)) {
    throw fail(400, "Enter a valid email address");
  }

  if (password.length < 8) {
    throw fail(400, "Password must be at least 8 characters");
  }

  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw fail(409, "Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await User.create({
      name: cleanName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    if (error.code === 11000) {
      throw fail(409, "Email is already registered");
    }
    throw error;
  }
};

const loginUser = async ({ email, password } = {}) => {
  if (typeof email !== "string" || typeof password !== "string") {
    throw fail(400, "Email and password are required");
  }

  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    throw fail(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw fail(401, "Invalid email or password");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

module.exports = {
  registerUser,
  loginUser,
};