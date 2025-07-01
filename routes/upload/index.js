const express = require("express");
const router = express.Router();
const uploadController = require("../../controllers/upload/uploadController");

const { upload } = require("../../middleware/multer");

router.post("/", upload.single("project_image"), uploadController.uploadImage);

module.exports = router;
