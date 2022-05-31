const { Schema, model } = require('mongoose');

// create schema using constructor imported from Mongoose
const CommentSchema = new Schema({
  writtenBy: {
    type: String
  },
  commentBody: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// create the Comment model using the PizzaSchema
const Comment = model('Comment', CommentSchema);

// export the Comment model
module.exports = Comment;