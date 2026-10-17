const mongoose = require("mongoose");

const INCIDENT_CATEGORIES = [
  "flood",
  "fire",
  "earthquake",
  "cyclone",
  "landslide",
  "drought",
  "pollution",
  "other",
];

const INCIDENT_STATUSES = [
  "submitted",
  "under_review",
  "verified",
  "rejected",
  "resolved",
];

const incidentSchema = new mongoose.Schema(
  {
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: INCIDENT_CATEGORIES,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 2000,
    },
    observedAt: {
      type: Date,
      required: true,
    },
    location: {
      description: {
        type: String,
        trim: true,
        maxlength: 200,
      },
    },
    status: {
      type: String,
      enum: INCIDENT_STATUSES,
      default: "submitted",
    },
  },
  {
    timestamps: true,
  }
);

incidentSchema.index({ reporterId: 1, createdAt: -1 });

const Incident = mongoose.model("Incident", incidentSchema);

module.exports = { Incident, INCIDENT_CATEGORIES, INCIDENT_STATUSES };