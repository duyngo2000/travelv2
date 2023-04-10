const mongoose = require('mongoose')
require('dotenv').config()
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectDB = () => {
    mongoose.connect(process.env.URI_DATABASE, connectionParams)
        .then(() => {
            console.log('Connected to the database')
        })
        .catch((err) => {
            console.log(`Connect DB Error: ${err}`);
        })
}
module.exports = connectDB