const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      trim: true,
    },
    body: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const aboutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    tagline: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    interests: {
      type: [String],
      default: [],
    },
    sections: {
      type: [sectionSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('About', aboutSchema);
