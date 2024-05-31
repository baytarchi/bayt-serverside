const express = require("express");
const router = express.Router();
const applicationController = require("../../controllers/application/applicationController");

router.post("/contact-us", applicationController.contactUs);

module.exports = router;
