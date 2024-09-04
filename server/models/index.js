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

const userSchema = new mongoose.Schema(
  {
    _id: String,
    username: String,
    password: String,
    email: String,
    role: String,
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = {
  Articles: mongoose.model('Articles', dataSchema),
  Users: mongoose.model('Users', userSchema),
};
