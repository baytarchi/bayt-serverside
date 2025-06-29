const express = require("express");
const router = express.Router();
const teamController = require("../../controllers/team/teamController");

const { upload } = require("../../middleware/multer");

router.post("/", upload.single("member_image"), teamController.addTeamMember);
router.patch(
  "/:team_member_id",
  upload.single("member_image"),
  teamController.updateTeamMember
);
router.get("/", teamController.getTeamMembers);
router.delete("/:team_member_id", teamController.deleteTeamMember);

module.exports = router;
