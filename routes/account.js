const express = require('express')
const ModelAccount = require('../models/account.js')
const router = express.Router()
const jwt = require('jsonwebtoken');


//lấy tất cả dữ liệu
router.get('/', (req, res) => {
    ModelAccount.find({}).sort({ createdAt: -1 })
        .populate('info')
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json("Lỗi server")
        })
})
//lấy tất cả dữ liệu
router.get('/level/0', (req, res) => {
    ModelAccount.find({
        level: 0
    })
        .populate('info')
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json("Lỗi server")
        })
})


//lấy một dữ liệu

router.get('/id/:id', (req, res) => {

    const id = req.params.id

    ModelAccount.findById(id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json("Lỗi server")
        })
})

//lấy dữ liệu thông qua username
router.get('/:username', (req, res) => {
    // console.log(req.params)
    const userName = req.params.username
    ModelAccount.find({ userName })
        .populate('info')
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json("Lỗi server")
        })
})

//thêm mới dữ liệu
router.post('/register', (req, res) => {
    const userName = req.body.userName
    const password = req.body.password
    const level = req.body.level

    ModelAccount.findOne({
        userName: userName
    })
        .then(data => {
            if (data) {
                res.json("Tên người dùng đã tồn tại")
            }
            else {
                return ModelAccount.create({
                    userName: userName,
                    password: password,
                    level: level
                })
            }
        })
        .then(data => {
            res.status(200).json("tạo tài khoản thành công")
        })
        .catch(err => {
            res.status(500).json("tạo tài khoản thất bại")
        })
})

router.post('/login', (req, res) => {
    const userName = req.body.userName
    const password = req.body.password

    ModelAccount.findOne({
        userName: userName,
        password: password
    })
        .then(data => {
            if (data) {
                const token = jwt.sign({ _id: data._id }, 'mk')
                res.json({
                    message: 'Đăng nhập thành công',
                    token: token,
                    userName: userName,
                    id: data._id,
                    level: data.level
                })
            }
            else {
                res.json('Đăng nhập thất bại')
            }
        })
        .catch(err => {
            res.status(500).json("Lỗi máy chủ")
        })
})
//update dữ liệu
router.put('/:id', (req, res) => {
    const id = req.params.id

    const NewName = req.body.userName
    const NewPassword = req.body.password
    const level = req.body.level

    ModelAccount.findByIdAndUpdate(id, {
        userName: NewName,
        password: NewPassword,
        level: level
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

    ModelAccount.deleteOne({
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