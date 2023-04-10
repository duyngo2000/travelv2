const express = require('express')
const router = express.Router()


//lấy tất cả dữ liệu
router.get('/',(req,res)=>{
})

//lấy một dữ liệu
router.get('/:id',(req,res)=>{

    const id = req.params.id

})

//thêm mới dữ liệu
router.post('/', (req,res)=>{
    const name = req.body.name
    const avatar = req.file.path
    const content = req.body.content
    const writer = req.body.writer


    ModelNews.create({
        name: name,
        avatar: "http://localhost:5000/api/tour/" + avatar,
        content: content,
        writer: writer
    })
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json("Thêm người dùng thất bại")
    })
})

//update dữ liệu
router.put('/:id', upload.single('avatar'), (req,res)=>{
    const id = req.params.id

    const NewName = req.body.name
    const NewView = req.body.view
    const OldAvatar = req.body.oldAvatar
    const NewAvatar = req.file
    const NewContents = req.body.contents
    const NewWriter = req.body.writer

    ModelNews.findByIdAndUpdate(id,{
        name: NewName,
        view: NewView,
        avatar: OldAvatar ? OldAvatar : "http://localhost:5000/api/news/" + NewAvatar.path ,
        contents: NewContents,
        writer: NewWriter
    })
    .then(data=>{
        res.json("cập nhật thành công")
    })
    .catch(err=>{
        res.status(500).json("Lỗi server")
    })
})

//xóa dữ liệu
router.delete('/:id',(req,res)=>{
    const id = req.params.id

    ModelNews.deleteOne({
        _id: id
    })
    .then(data=>{
        res.json("Xóa thành công")
    })
    .catch(err=>{
        res.status(500).json("Lỗi server")
    })
})

module.exports = router