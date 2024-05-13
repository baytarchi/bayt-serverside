const express = require("express");
const router = express.Router();
const projectController = require("../../controllers/project/projectController");

router.post("/", projectController.addProject);

module.exports = router;
