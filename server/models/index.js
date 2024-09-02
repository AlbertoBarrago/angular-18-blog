const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
      },
    },
  }
);

module.exports = mongoose.model('Articles', dataSchema);
