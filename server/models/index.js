const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    author: String,
    shortContent: String,
    content: String,
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('Articles', dataSchema);
