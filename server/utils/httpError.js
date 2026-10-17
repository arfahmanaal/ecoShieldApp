const fail = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

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

module.exports = { fail, handleError };