const mongoose = require('mongoose')

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    age: Number,
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    // password: {
    //     type: String,
    //     required: true,
    //     max: 1024,
    //     min: 6
    // },
    // date: {
    //     type: Date,
    //     default: Date.now
    // },
    phone: Number,
    address: String,
    allTour: [
        {
            idTour: {
                type: String,
                ref: "tour"
            }
        }
    ],
    method: Number,
    pay: {
        type: Number,
        default: 0
    },
    account: {}

},
    { timestamps: true },
    {
        collection: 'users'
    });


module.exports = mongoose.model('users', userSchema); 
