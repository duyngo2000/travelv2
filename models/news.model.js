const mongoose = require('mongoose')

const { Schema } = mongoose;


const newsSchema = new Schema({
  name: String,//Các địa điểm nổi tiếng và món ăn không nên bỏ lỡ khi du lịch Séc
  image: String,
  summary: String,
  view: Number
},
  { timestamps: true },
  {
    collection: 'news'
  });

module.exports = mongoose.model('news', newsSchema);
