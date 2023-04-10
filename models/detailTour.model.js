const mongoose = require("mongoose")

const { Schema } = mongoose

const detailTourSchema = new Schema({
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tour"
    },
    listImage: {
        type: Array,
        require: true
    },
    seats: {
        type: Number,
        require: true
    },
    departureFrom: String,
    schedule: []
},
    {
        collection: "detailTour"
    }
)

module.exports = mongoose.model("detailTour", detailTourSchema)