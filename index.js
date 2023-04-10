const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const crawlertour = require("./crawltour")
const crawlernews = require("./crawlnews")
const app = express()
var cors = require('cors')
const connectDB = require('./connectDB.js')

const port = process.env.PORT || 5000

connectDB()

// crawlertour()
// crawlernews()
const tourRouter = require('./routes/tour.router')
const detailTourRouter = require('./routes/detailTour.router')
const newsRouter = require('./routes/news.router.js')
const contactRouter = require('./routes/contact.js')
// const accountRouter = require('./routes/account.js')
// const uploadRouter = require('./routes/upload.js')
// const paypalRouter = require('./routes/paypal.js')
// const userRouter = require('./routes/user.js')
// const placeRouter = require('./routes/place.js')

const authRoute = require('./routes/auth.js')

app.use('/api/user', cors(), authRoute)


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/news/upload', express.static('upload'))
app.use('/api/tour/upload', express.static('upload'))
app.use('/upload/', express.static('upload'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/tour/', cors(), tourRouter)
app.use('/api/detailtour/', cors(), detailTourRouter)
app.use('/api/news/', cors(), newsRouter)
app.use('/api/contact/', cors(), contactRouter)
// app.use('/api/account/', cors(), accountRouter)
// app.use('/upload/', cors(), uploadRouter)
// app.use('/paypal/', cors(), paypalRouter)
// app.use('/api/user/', cors(), userRouter)
// app.use('/api/place/', cors(), placeRouter)

// app.use(cors(), function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})