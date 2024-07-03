const express = require("express");
const router = express.Router();
const applicationController = require("../../controllers/application/applicationController");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/contact-us", applicationController.contactUs);
router.post(
  "/career",
  upload.fields([{ name: "cv" }, { name: "coverLetter" }]),
  applicationController.career
);

module.exports = router;
