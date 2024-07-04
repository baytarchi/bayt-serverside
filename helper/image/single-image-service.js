const axios = require("axios");
const IMGBB_API_KEY = "91ead0c15547e73027a2f890b81fba24";

class PhotoService {
  constructor(file) {
    this.file = file;
  }

  upload = async () => {
    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      {
        key: IMGBB_API_KEY,
        image: this.file?.buffer.toString("base64"),
      },
      { headers: { "content-type": "multipart/form-data" } }
    );

    if (response.data && response.data.data && response.data.data.display_url) {
      const profilePhotoLink = response.data.data.display_url;
      return profilePhotoLink;
    } else {
      console.error("Failed to upload photo. Response:", response.data);
      return null;
    }
  };
}

module.exports = PhotoService;
