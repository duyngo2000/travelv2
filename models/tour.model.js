const mongoose = require('mongoose')

const { Schema } = mongoose;

const tourSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    code: String,
    image: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    timeStart: {
        type: Date,
        require: true
    },
    timeEnd: {
        type: Date,
        require: true
    },
},
    {
        collection: 'tour'
    });

module.exports = mongoose.model('tour', tourSchema);


// tên chuyến đi
// ảnh đại diện
// giá
// ngày khởi hàng
// ngày về
