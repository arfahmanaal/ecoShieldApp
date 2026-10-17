const express = require("express");
const incidentController = require("../controllers/incidentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, incidentController.create);

module.exports = router;