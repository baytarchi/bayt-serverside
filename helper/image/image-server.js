const axios = require("axios");
require("dotenv").config();
const IMGBB_API_KEY = process.env.IMGBB_API_KEY;

class PhotoService {
  constructor(files) {
    this.files = files;
  }

  upload = async () => {
    const uploadPromises = this.files.map(async (file, index) => {
      try {
        if (!file.buffer) {
          console.error(
            `File at index ${index} does not have a buffer property.`
          );
          return null;
        }

        const base64Image = file.buffer.toString("base64");
        const response = await axios.post(
          "https://api.imgbb.com/1/upload",
          {
            key: IMGBB_API_KEY,
            image: base64Image,
          },
          { headers: { "content-type": "multipart/form-data" } }
        );

        if (
          response.data &&
          response.data.data &&
          response.data.data.display_url
        ) {
          return response.data.data.display_url;
        } else {
          console.error(
            `Failed to upload photo at index ${index}. Response:`,
            response.data
          );
          return null;
        }
      } catch (error) {
        console.error(`Error uploading file at index ${index}:`, error);
        return null;
      }
    });

    const uploadResults = await Promise.all(uploadPromises);
    return uploadResults.filter((url) => url !== null); // Filter out any null results
  };
}

module.exports = PhotoService;
