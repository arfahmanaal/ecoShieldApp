const authService = require("../services/authService");

const handleError = (res, error, fallbackMessage) => {
  if (error.status) {
    return res.status(error.status).json({
      success: false,
      message: error.message,
    });
  }

  console.error(fallbackMessage, "|", error.message);

  res.status(500).json({
    success: false,
    message: fallbackMessage,
  });
};

const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { user },
    });
  } catch (error) {
    handleError(res, error, "Registration failed");
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    handleError(res, error, "Login failed");
  }
};

module.exports = {
  register,
  login,
};