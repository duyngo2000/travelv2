const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/duy');

const { Schema } = mongoose;

const placeSchema = new Schema({
    "name": String,
    "code": Number,
    "codename": String,
    "division_type": String,
    "phone_code": Number,
    "districts": [
        {
            "name": String,
            "code": Number,
            "codename": String,
            "division_type": String,
            "short_codename": String,
            "wards": [
                {
                    "name": String,
                    "code": Number,
                    "codename": String,
                    "division_type": String,
                    "short_codename": String,
                    "commune": [
                        {
                            "name": String,
                            "codename": String,
                            "division_type": String,
                            "short_codename": String,
                            "apartmentNumber": [
                                {
                                    "name": String,
                                    "division_type": String,
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
},
    { timestamps: true },
    {
        collection: 'place'
    });

module.exports = mongoose.model('place', placeSchema);
