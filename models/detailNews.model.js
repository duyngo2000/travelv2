const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/duy');

const { Schema } = mongoose;


const detailNewsSchema = new Schema({
  news: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "news"
  },
  view: {
    type: Number,
    default: 0
  },//15 lượt xem
  content: String,
  writer: String,
},
  {
    collection: 'detailnews'
  });

module.exports = mongoose.model('detailnews', detailNewsSchema);
