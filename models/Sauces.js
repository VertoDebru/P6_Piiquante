const mongoose = require('mongoose');

// Schema for MongoDB.
const saucesSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, require: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  heat: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type : Array , "default" : [] },
  usersDisliked: { type : Array , "default" : [] },
});

module.exports = mongoose.model('Sauces', saucesSchema);
