const express = require("express");
const router = express.Router();
const teamController = require("../../controllers/team/teamController");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("member_image"), teamController.addTeamMember);
router.patch(
  "/:team_member_id",
  upload.single("member_image"),
  teamController.updateTeamMember
);
router.get("/", teamController.getTeamMembers);
router.delete("/:team_member_id", teamController.deleteTeamMember);

module.exports = router;
