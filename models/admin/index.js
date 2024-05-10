const { Schema, default: mongoose, model } = require("mongoose");

const adminSchema = new Schema({
  user_name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
});

module.exports = model("Admin", adminSchema);
