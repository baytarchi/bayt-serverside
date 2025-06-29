const express = require("express");
const router = express.Router();
const applicationController = require("../../controllers/application/applicationController");
const { upload } = require("../../middleware/multer");

router.post("/contact-us", applicationController.contactUs);
router.post(
  "/career",
  upload.fields([{ name: "cv", maxCount: 1 }, { name: "coverLetter" }]),
  applicationController.career
);

module.exports = router;
