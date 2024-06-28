const { Schema, default: mongoose, model } = require("mongoose");

const teamSchema = new Schema(
  {
    member_name: {
      type: String,
      required: true,
    },
    member_image: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    isWorker: {
      type: Boolean,
      required: false,
    },
  },
  { versionKey: false }
);

module.exports = model("Team", teamSchema);
