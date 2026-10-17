const incidentService = require("../services/incidentService");
const { handleError } = require("../utils/httpError");

const create = async (req, res) => {
  try {
    const incident = await incidentService.createIncident(
      req.user._id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Incident reported successfully",
      data: { incident },
    });
  } catch (error) {
    handleError(res, error, "Failed to submit incident");
  }
};

module.exports = {
  create,
};