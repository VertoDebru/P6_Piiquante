const mongoose = require('mongoose');

const saucesSchema = mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  manufacturer: { type: String, require: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  heat: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: String },
  usersDisliked: { type: String },
});

module.exports = mongoose.model('Sauces', saucesSchema);