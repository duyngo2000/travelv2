const express = require('express')
const ModelDetailTour = require('../models/detailTour.model')
const multer = require('multer')
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (res, file, cb) {
        cb(null, './upload')
    },
    filename: function (res, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

// localhost:5000/api/tour/getlist
router.get("/getbyid", async (req, res) => {
    const { _id } = req.query
    ModelDetailTour.findById(_id).populate("tour")
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json("Lỗi server")
        })
})
router.get("/getbyidtour", async (req, res) => {
    const { _id } = req.query
    ModelDetailTour.findOne({ tour: _id }).populate("tour")
        .then(data => {
            res.json({ data, message: "get thành công" })
        })
        .catch(err => {
            res.status(500).json(err)
        })
})
//thêm mới dữ liệu
router.post('/', upload.array("images", 10), (req, res) => {
    const listImage = req.files
    const seats = req.body.seats
    const departureFrom = req.body.departureFrom
    const schedule = req.body.schedule
    const tour = req.body.tour

    ModelTour.create({
        listImage: listImage.map(item => item.path),
        seats: seats,
        departureFrom: departureFrom,
        schedule: schedule,
        tour: tour
    })
        .then(data => {
            res.json(data)
            res.json("Thêm thông tin thành công")
        })
        .catch(err => {
            res.status(500).json("Thêm người dùng thất bại")
        })
})
//lấy tất cả dữ liệu
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
    const id = req.params.id
    ModelTour.findById(id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json("Lỗi server")
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