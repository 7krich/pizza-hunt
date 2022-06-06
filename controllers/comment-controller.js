// import models
const { Comment, Pizza } = require('../models');

const commentController = {
  // methods
  // add comment to pizza
  addComment({ params, body }, res) {
    console.log(body);
    Comment.create(body)
      .then(({ _id }) => {
        return Pizza.findOneAndUpdate(
            { _id: params.pizzaId },
            // push into an array
            { $push: { comments: _id } },
            // true - receive back the updated pizza (pizza with the new comment)
            { new: true }
        );
      })
      .then(dbPizzaData => {
          if (!dbPizzaData) {
              res.status(404).json({ message: 'Not pizza found with this id!' });
              return;
          }
          res.json(dbPizzaData);
      })
      .catch(err => res.json(err));
  },

  addReply({ params, body }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
    )
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.json(err));
  },

  // remove reply
  removeReply({ params }, res) {
  Comment.findOneAndUpdate(
    { _id: params.commentId },
    // remove the specified reply from the replies array where replyId matches params.replyId
    { $pull: { replies: { replyId: params.replyId } } },
    { new: true }
  )
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => res.json(err));
  },

  // remove comment
  removeComment({ params }, res) {
    // findOneAndDelete -> delete document and also return its data
    Comment.findOneAndDelete({ _id: params.commentId })
      .then(deletedComment => {
        if (!deletedComment) {
          return res.status(404).json({ message: 'No comment with this id!' });
        }
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $pull: { comments: params.commentId } },
          { new: true }
        );
      })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.json(err));
  }
};

module.exports = commentController;