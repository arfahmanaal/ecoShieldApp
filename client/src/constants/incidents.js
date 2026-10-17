import { colors } from "./theme";

export const INCIDENT_CATEGORIES = [
  { value: "flood", label: "Flood" },
  { value: "fire", label: "Fire" },
  { value: "earthquake", label: "Earthquake" },
  { value: "cyclone", label: "Cyclone" },
  { value: "landslide", label: "Landslide" },
  { value: "drought", label: "Drought" },
  { value: "pollution", label: "Pollution" },
  { value: "other", label: "Other" },
];

export const INCIDENT_STATUS_STYLES = {
  submitted: {
    label: "Submitted",
    backgroundColor: colors.lintLight,
    textColor: colors.forest,
  },
  under_review: {
    label: "Under review",
    backgroundColor: colors.lint,
    textColor: colors.forest,
  },
  verified: {
    label: "Verified",
    backgroundColor: colors.forest,
    textColor: colors.white,
  },
  rejected: {
    label: "Rejected",
    backgroundColor: "#f6dcd9",
    textColor: "#8a2a22",
  },
  resolved: {
    label: "Resolved",
    backgroundColor: "#dcebe0",
    textColor: colors.forest,
  },
};

export const getCategoryLabel = (value) => {
  const match = INCIDENT_CATEGORIES.find((category) => category.value === value);
  return match ? match.label : value;
};