const { Schema, model } = require('mongoose');

// create schema using constructor imported from Mongoose
const PizzaSchema = new Schema({
    // define fields with specific data types & regulate what data will look like
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        // if value is provided default to Data.now function & provide timestamp
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: []
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza Model
module.exports = Pizza;