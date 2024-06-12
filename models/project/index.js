const { boolean } = require("joi");
const { model, Schema } = require("mongoose");
const slugify = require("slugify");

const projectSchema = new Schema(
  {
    project_slug: {
      type: String,
      required: false,
    },
    isPortfolio: {
      type: Boolean,
      required: true,
    },
    project_name: {
      type: String,
      required: true,
    },
    project_description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    architects: {
      type: String,
      required: false,
    },
    gross_built_area: {
      type: String,
      required: false,
    },
    project_location: {
      type: String,
      required: false,
    },
    completion_year: {
      type: String,
      required: false,
    },
    featured_image: {
      type: String,
      required: false,
    },
    captions: {
      type: [String],
      required: false,
    },
    project_photo_links: {
      type: [String],
      required: false,
    },
  },
  { versionKey: false }
);

projectSchema.pre("save", function (next) {
  const currentDate = new Date().toISOString().slice(0, 10);
  const uniqueIdentifier = Date.now(); // Use a timestamp as a unique identifier
  this.project_slug =
    slugify(this.project_name, {
      lower: true,
      remove: /[*+~.()'"!?:@]/g,
    }) +
    "-" +
    currentDate +
    "-" +
    uniqueIdentifier;
  next();
});

projectSchema.index({ project_slug: 1 }, { unique: true });

module.exports = model("Project", projectSchema);
