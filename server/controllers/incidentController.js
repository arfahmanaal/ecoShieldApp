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

const listMine = async (req, res) => {
  try {
    const incidents = await incidentService.listMyIncidents(req.user._id);

    res.status(200).json({
      success: true,
      message: "Incidents retrieved",
      data: { incidents, count: incidents.length },
    });
  } catch (error) {
    handleError(res, error, "Failed to retrieve incidents");
  }
};

const getOne = async (req, res) => {
  try {
    const incident = await incidentService.getMyIncident(
      req.user._id,
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Incident retrieved",
      data: { incident },
    });
  } catch (error) {
    handleError(res, error, "Failed to retrieve incident");
  }
};

module.exports = {
  create,
  listMine,
  getOne,
};