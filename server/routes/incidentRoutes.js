const express = require("express");
const incidentController = require("../controllers/incidentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, incidentController.create);
router.get("/my", protect, incidentController.listMine);
router.get("/:id", protect, incidentController.getOne);

module.exports = router;