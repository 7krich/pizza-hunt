const { Schema, model } = require('mongoose');
// import dateFormat function from utils
const dateFormat = require('../utils/dateFormat');


// create schema using constructor imported from Mongoose
const PizzaSchema = new Schema({
    // define fields with specific data types & regulate what data will look like
    pizzaName: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: String,
        requried: true,
        trim: true
    },
    createdAt: {
        type: Date,
        // if value is provided default to Data.now function & provide timestamp
        default: Date.now,
        // getter - each time pizza is retrieved, value is formatted by dateFormat
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        required: true,
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
        default: 'Large'
    },
    toppings: [],
    comments: [
        {
            // define type to create relationship to child - Comment
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
{
    // tell schema it can use virtuals
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// get total all comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    // use reduce to tally up total of every comment with its replies
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza Model
module.exports = Pizza;