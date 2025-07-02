const express = require("express");
const multer = require("multer");
const router = express.Router();
const projectController = require("../../controllers/project/projectController");
const upload = multer();

router.post("/", upload.none(), projectController.addProject);
router.patch("/:project_id", upload.none(), projectController.updateProject);
router.get("/", projectController.getProjects);
router.get("/:project_slug", projectController.getProject);
router.delete("/:project_id", projectController.deleteProject);

module.exports = router;
