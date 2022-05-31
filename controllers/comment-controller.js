// import models
const { Comment, Pizza } = require('../models');

const commentController = {
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

  // remove comment
  removeComment() {

  }
};

module.exports = commentController;