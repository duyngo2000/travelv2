const express = require('express')
const ModelUser = require('../models/user.js').default
const router = express.Router()


//lấy tất cả dữ liệu
router.get('/', (req, res) => {
    ModelUser.find({})
        .populate('allTour.idTour')
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//lấy một dữ liệu
router.get('/:id', (req, res) => {

    const id = req.params.id

    ModelUser.findById(id)
        .populate("allTour.idTour")
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/account/:id', (req, res) => {

    const account = req.params.id
    ModelUser.find({ account })
        .populate("allTour.idTour")
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.put('/account/:id', (req, res) => {
    const account = req.params.id

    const name = req.body.name
    const age = req.body.age
    const email = req.body.email
    const phone = req.body.phone
    const address = req.body.address

    ModelUser.findOneAndUpdate({ account }, {
        name: name,
        age: age,
        email: email,
        phone: phone,
        address: address
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).json("Lỗi server", err)
        })
})

//thêm mới dữ liệu
router.post('/', (req, res) => {
    const name = req.body.name
    const age = req.body.age
    const email = req.body.email
    const phone = req.body.phone
    const address = req.body.address
    const idTour = req.body.idTour
    const method = req.body.method
    const pay = req.body.pay
    const account = req.body.account

    ModelUser.create({
        name: name,
        age: age,
        email: email,
        phone: phone,
        address: address,
        allTour: { idTour: idTour },
        method: method,
        pay: pay,
        account: account
    })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json("Thêm người dùng thất bại")
        })
})

//update dữ liệu
router.put('/:id', (req, res) => {
    const id = req.params.id

    const name = req.body.name
    const age = req.body.age
    const email = req.body.email
    const phone = req.body.phone
    const address = req.body.address
    const idTour = req.body.idTour
    const method = req.body.method
    const pay = req.body.pay
    const account = req.body.account


    ModelUser.findByIdAndUpdate(id, {
        name: name,
        age: age,
        email: email,
        phone: phone,
        address: address,
        allTour: { idTour: idTour },
        method: method,
        pay: pay,
        account: account
    })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json("Lỗi server", err)
        })
})

//xóa dữ liệu
router.delete('/:id', (req, res) => {
    const id = req.params.id

    ModelUser.deleteOne({
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