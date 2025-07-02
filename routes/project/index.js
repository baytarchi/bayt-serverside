const express = require("express");
const router = express.Router();
const projectController = require("../../controllers/project/projectController");

router.post("/", projectController.addProject);
router.patch("/:project_id", projectController.updateProject);
router.get("/", projectController.getProjects);
router.get("/:project_slug", projectController.getProject);
router.delete("/:project_id", projectController.deleteProject);

module.exports = router;
