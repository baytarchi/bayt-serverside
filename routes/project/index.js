const express = require("express");
const router = express.Router();
const projectController = require("../../controllers/project/projectController");
const { upload } = require("../../middleware/multer");

router.post("/", upload.array("photos"), projectController.addProject);
router.patch(
  "/:project_id",
  upload.array("photos"),
  projectController.updateProject
);
router.get("/", projectController.getProjects);
router.get("/:project_slug", projectController.getProject);
router.delete("/:project_id", projectController.deleteProject);

module.exports = router;
