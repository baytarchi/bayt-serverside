const { Schema, default: mongoose, model } = require("mongoose");

const categorySchema = new Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
module.exports = model("Category", categorySchema);
