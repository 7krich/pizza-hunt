const { Pizza } = require('../models');

const pizzaController = {
    // find methods
    // get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
            // populate comments 
            .populate({
            path: 'comments',
            select: '-__v'
            })
            .select('-__v')
            // sort comments in descending order by _id value
            .sort({ _id: -1 })
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get one pizza by id
    getPizzaById({ params }, res) {
        // destructure params out of req since we don't need addtl data from req
        Pizza.findOne({ _id: params.id })
        .populate({
          path: 'comments',
          select: '-__v'
        })
        .select('-__v')
        .then(dbPizzaData => {
          if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
          }
          res.json(dbPizzaData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },

    // create method
    // createPizza
    createPizza({ body }, res) {
        // destructure body out of req since we don't need any other data provided
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },

    // update method
    // update pizza by id
    updatePizza({ params, body }, res) {
        // find single document to update, update it & return it to original doc
        // "where" clause is used first, then the updated data then the options for how to return
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete method
    // delete pizza
    deletePizza({ params }, res) {
        // find document & delete it from db
        Pizza.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;