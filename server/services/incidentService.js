const { Incident, INCIDENT_CATEGORIES } = require("../models/Incident");
const { fail } = require("../utils/httpError");

const OBJECT_ID_PATTERN = /^[a-f\d]{24}$/i;
const MY_INCIDENTS_LIMIT = 100;

const toResponse = (incident) => ({
  id: incident._id,
  category: incident.category,
  title: incident.title,
  description: incident.description,
  observedAt: incident.observedAt,
  location: incident.location?.description
    ? { description: incident.location.description }
    : null,
  status: incident.status,
  createdAt: incident.createdAt,
});

const createIncident = async (reporterId, body = {}) => {
  const { category, title, description, observedAt, location } = body;

  if (
    typeof category !== "string" ||
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof observedAt !== "string"
  ) {
    throw fail(
      400,
      "Category, title, description and observation time are required"
    );
  }

  if (!INCIDENT_CATEGORIES.includes(category)) {
    throw fail(400, `Category must be one of: ${INCIDENT_CATEGORIES.join(", ")}`);
  }

  const cleanTitle = title.trim();
  const cleanDescription = description.trim();

  if (cleanTitle.length < 3 || cleanTitle.length > 100) {
    throw fail(400, "Title must be 3 to 100 characters");
  }

  if (cleanDescription.length < 10 || cleanDescription.length > 2000) {
    throw fail(400, "Description must be 10 to 2000 characters");
  }

  const observedDate = new Date(observedAt);

  if (Number.isNaN(observedDate.getTime())) {
    throw fail(400, "Observation time is invalid");
  }

  if (observedDate.getTime() > Date.now() + 5 * 60 * 1000) {
    throw fail(400, "Observation time cannot be in the future");
  }

  const locationText =
    location && typeof location.description === "string"
      ? location.description.trim()
      : "";

  if (locationText.length > 200) {
    throw fail(400, "Location must be 200 characters or fewer");
  }

  const incident = await Incident.create({
    reporterId,
    category,
    title: cleanTitle,
    description: cleanDescription,
    observedAt: observedDate,
    location: locationText ? { description: locationText } : undefined,
  });

  return toResponse(incident);
};

const listMyIncidents = async (reporterId) => {
  const incidents = await Incident.find({ reporterId })
    .sort({ createdAt: -1 })
    .limit(MY_INCIDENTS_LIMIT);

  return incidents.map(toResponse);
};

const getMyIncident = async (reporterId, incidentId) => {
  if (!OBJECT_ID_PATTERN.test(incidentId)) {
    throw fail(400, "Invalid incident id");
  }

  const incident = await Incident.findOne({
    _id: incidentId,
    reporterId,
  });

  if (!incident) {
    throw fail(404, "Incident not found");
  }

  return toResponse(incident);
};

module.exports = {
  createIncident,
  listMyIncidents,
  getMyIncident,
};