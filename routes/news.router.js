const express = require('express')
const ModelNews = require('../models/news.model.js')
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
const getTotalPage = async () => {
    return await ModelNews.find({}).count();
}
//lấy tất cả dữ liệu
router.get('/getlist', async (req, res) => {
    const { _page } = req.query;
    const response = await getTotalPage();
    const news = await ModelNews.find({}).skip((_page - 1) * 10).limit(10);
    res.send({
        _page,
        totalPage: Math.ceil(response / 10),
        news: [...news]
    })
})
router.get('/getbyview', async (req, res) => {
    const { _limit } = req.query;
    const news = await ModelNews.find({}).sort({ view: -1 }).limit(_limit);
    res.send({
        news: [...news]
    })
})

router.get('/gettraveltips', (req, res) => {
    const { _limit } = req.query;

    ModelNews.find({}).sort({ createdAt: -1 }).limit(_limit)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json("Lỗi server")
        })
})

router.get('/getbyexperience', (req, res) => {
    const { _limit } = req.query;

    ModelNews.find({ name: /Kinh nghiệm/ }).sort({ createdAt: 1 }).limit(_limit)
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

    ModelNews.findById(id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json("Lỗi server")
        })
})

//thêm mới dữ liệu
router.post('/', upload.single('image'), (req, res) => {
    const name = req.body.name
    const image = req.file.path
    const summary = req.body.summary
    const view = req.body.view

    ModelNews.create({
        name: name,
        image: image,
        summary: summary,
        view: view
    })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json("Thêm người dùng thất bại")
        })
})

//update dữ liệu
router.put('/:id', upload.single('avatar'), (req, res) => {
    const id = req.params.id

    const NewName = req.body.name
    const NewView = req.body.view
    const OldAvatar = req.body.oldAvatar
    const NewAvatar = req.file
    const NewContent = req.body.content
    const NewWriter = req.body.writer

    ModelNews.findByIdAndUpdate(id, {
        name: NewName,
        view: NewView,
        avatar: OldAvatar ? OldAvatar : "https://traveol.herokuapp.com/api/news/" + NewAvatar.path,
        content: NewContent,
        writer: NewWriter
    })
        .then(data => {
            res.json("cập nhật thành công")
        })
        .catch(err => {
            res.status(500).json("Lỗi server")
        })
})

//update view
router.put('/view/:id', (req, res) => {
    const id = req.params.id

    const NewView = req.body.view

    ModelNews.findByIdAndUpdate(id, {
        view: NewView,
    })
        .then(data => {
            res.json("cập nhật thành công")
        })
        .catch(err => {
            res.status(500).json("Lỗi server")
        })
})

//xóa dữ liệu
router.delete('/:id', (req, res) => {
    const id = req.params.id

    ModelNews.deleteOne({
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