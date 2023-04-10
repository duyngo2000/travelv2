const express = require('express')
const ModelPlace = require('../models/place.js')
const router = express.Router()



//lấy tất cả dữ liệu
router.get('/', (req, res) => {
    const page = req.query['page']

    ModelPlace.find({})
        .then(data => {
            res.json(data)
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

//thêm mới dữ liệu


//update dữ liệu


//update dữ liệu


//xóa dữ liệu


module.exports = router