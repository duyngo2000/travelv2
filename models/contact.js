const mongoose = require('mongoose')

const { Schema } = mongoose

const contactSchema = Schema({
    name: String,
    email: String,
    content: String
},
    {
        timestamps: true
    },
    {
        collection: 'contact'
    })

module.exports = mongoose.model('contact', contactSchema)