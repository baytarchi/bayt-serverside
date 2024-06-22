const { model, Schema, mongoose } = require("mongoose");

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    // prettier-ignore
    // eslint-disable-next-line security/detect-unsafe-regex
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

adminSchema.index({ email: 1 }, { unique: true });

module.exports = model("Admin", adminSchema);
