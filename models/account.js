const mongoose = require('mongoose')

const { Schema } = mongoose;


const accountSchema = new Schema({
    userName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    level: {
        type: Array,
        default: 0
    },
    info: {
        type: {},
        ref: 'user'
    }
},
    { timestamps: true },
    {
        collection: 'account'
    });

const ModelAccount = mongoose.model('account', accountSchema);

module.exports = ModelAccount
