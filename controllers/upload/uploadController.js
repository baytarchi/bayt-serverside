const teamService = require("../../services/team/teamService");
const { singleUpload } = require("../../utils/cloudinary");

const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const imageUrl = await singleUpload(req.file);
    return res.status(200).json({ url: imageUrl });
  } catch (error) {
    return res.status(500).json({ error: "Upload failed" });
  }
};

module.exports = {
  uploadImage,
};
