const express = require("express");
const router = express.Router();
const projectController = require("../../controllers/project/projectController");

router.post("/", projectController.addProject);
router.get("/", projectController.getProjects);
router.get("/:project_slug", projectController.getProject);

module.exports = router;
