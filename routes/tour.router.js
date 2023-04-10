const express = require('express')
const ModelTour = require('../models/tour.model')
const multer = require('multer')
const router = express.Router()
const port = process.env.PORT || 5000

const storage = multer.diskStorage({
    destination: function (res, file, cb) {
        cb(null, './upload')
    },
    filename: function (res, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

const getTotalPage = async () => {
    return await ModelTour.find({}).count();
}
// localhost:5000/api/tour/getlist
router.get("/getlist", async (req, res) => {
    const { _page } = req.query;
    const response = await getTotalPage();
    const tour = await ModelTour.find({}).sort({ _id: -1 }).skip((_page - 1) * 20).limit(20);
    res.send({
        _page,
        totalPage: Math.ceil(response / 20),
        tour: [...tour]
    })
})
// localhost:5000/api/tour/getbyfaverite
router.get("/getbyfaverite", async (req, res) => {
    const { _limit } = req.query;
    const tour = await ModelTour.find({}).limit(_limit);
    res.send(tour)
})

router.get("/getbyexpensivetour", async (req, res) => {
    const { _limit } = req.query;
    const tour = await ModelTour.find({}).sort({ price: -1 }).limit(_limit);
    res.send(tour)
})

// localhost:5000/api/tour/getbycheaptour
router.get("/getbycheaptour", async (req, res) => {
    const { _limit } = req.query;
    const tour = await ModelTour.find({}).sort({ price: 1 }).limit(_limit);
    res.send(tour)
})

router.post('/post', upload.single('image'), (req, res) => {
    const name = req.body.name
    const image = req.file
    const price = req.body.price
    const timeStart = req.body.timeStart
    const timeEnd = req.body.timeEnd
    ModelTour.create({
        name: name,
        image: image.path,
        price: price,
        timeStart: timeStart,
        timeEnd: timeEnd,
    })
        .then(data => {
            res.json({ message: "Thêm tour thành công", idTour: data._id })
            // res.json("Thêm thông tin thành công")
        })
        .catch(err => {
            res.status(500).json("Thêm người dùng thất bại")
        })
})

//lấy tất cả dữ liệu
router.get('/gettotalpage', (req, res) => {
    const page = req.query['page']
    const nextPage = 20
    let total_page
    let total_index
    ModelTour.find({}).count().then(data => {
        total_page = (data / nextPage).toFixed()
        total_index = data
    }).catch(err => res.status(500).json("Lỗi server"))

    ModelTour.find({}).skip(page * nextPage).limit(nextPage)
        .then(data => {
            res.json({ page: page, limit: nextPage, total_page, total_index, data })
        })
        .catch(err => {
            res.status(500).json("Lỗi server")
        })
})

//lấy một dữ liệu
router.get('/', (req, res) => {
    const { _id } = req.query

    ModelTour.findById(_id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).json("Lỗi server")
        })
})

//thêm mới dữ liệu
router.post('/', upload.array("images", 10), (req, res) => {
    const name = req.body.name
    const price = req.body.price
    const image = req.files
    console.log(image)
    const seats = req.body.seats
    const departureFrom = req.body.departureFrom
    const description = req.body.description
    const timeStart = req.body.timeStart
    const timeEnd = req.body.timeEnd
    const schedule = req.body.schedule

    ModelTour.create({
        name: name,
        image: image.map(item => "https://traveol.herokuapp.com/api/tour/" + item.path),
        price: price,
        seats: seats,
        departureFrom: departureFrom,
        description: description,
        timeStart: timeStart,
        timeEnd: timeEnd,
        schedule: schedule
    })
        .then(data => {
            res.json(data)
            res.json("Thêm thông tin thành công")
        })
        .catch(err => {
            res.status(500).json("Thêm người dùng thất bại")
        })
})

//update dữ liệu
router.put('/:id', upload.array("images", 10), (req, res) => {
    const id = req.params.id

    const newName = req.body.name
    const newImage = req.files
    const oldImage = req.body.oldImages
    const newPrice = req.body.price
    const newSeats = req.body.seats
    const newDepartureFrom = req.body.departureFrom
    const newDescription = req.body.description
    const newTimeStart = req.body.timeStart
    const newTimeEnd = req.body.timeEnd
    const newSchedule = req.body.schedule

    ModelTour.findByIdAndUpdate(id, {
        name: newName,
        image: oldImage.concat(newImage.map(item => "https://traveol.herokuapp.com/api/tour/" + item.path)),
        price: newPrice,
        seats: newSeats,
        departureFrom: newDepartureFrom,
        description: newDescription,
        timeStart: newTimeStart,
        timeEnd: newTimeEnd,
        schedule: newSchedule
    })
        .then(data => {
            res.json(data)
            res.json("cập nhật thành công")
        })
        .catch(err => {
            res.status(500).json("Lỗi server")
        })
})

//update dữ liệu
router.put('/seats/:id', upload.array("images", 10), (req, res) => {
    const id = req.params.id

    const newSeats = req.body.seats

    ModelTour.findByIdAndUpdate(id, {
        seats: newSeats,
    })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json("Lỗi server")
        })
})

//xóa dữ liệu
router.delete('/:id', (req, res) => {
    const id = req.params.id

    ModelTour.deleteOne({
        _id: id
    })
        .then(data => {
            res.json("Xóa thành công")
        })
        .catch(err => {
            res.status(500).json("Lỗi server")
        })
})

module.exports = router