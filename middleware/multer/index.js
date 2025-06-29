const multer = require("multer");

// Disk storage configuration
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp/my-uploads"); // Specify your desired upload directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // Generate a unique suffix
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname); // Append original file name for clarity
  },
});

const memoryStorage = multer.memoryStorage();

const upload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: function (req, file, cb) {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, JPG, PNG, and WebP files are allowed!"), false);
    }
  },
});

module.exports = {
  upload,
};
