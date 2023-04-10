const express = require('express')
const ModelContact = require('../models/contact.js')
const router = express.Router()


//lấy tất cả dữ liệu
router.get('/',(req,res)=>{
    ModelContact.find({})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json("Lỗi server")
    })
})

//lấy một dữ liệu
router.get('/:id',(req,res)=>{

    const id = req.params.id

    ModelContact.findById(id)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json("Lỗi server")
    })
})

//thêm mới dữ liệu
router.post('/',(req,res)=>{
    const name = req.body.name
    const email = req.body.email
    const content = req.body.content


    ModelContact.create({
        name: name,
        email: email,
        content: content
    })
    .then(data=>{
        res.status(200).json("Gởi thành công")
    })
    .catch(err=>{
        res.status(500).json("Gởi thất bại")
    })
})

//update dữ liệu
router.put('/:id',(req,res)=>{
    const id = req.params.id

    const NewName = req.body.name
    const NewEmail = req.body.email
    const NewContent = req.body.content

    ModelContact.findByIdAndUpdate(id,{
        name: NewName,
        email: NewEmail,
        content: NewContent,
    })
    .then(data=>{
        res.json(data)
        // res.json("cập nhật thành công")
    })
    .catch(err=>{
        res.status(500).json("Lỗi server")
    })
})

//xóa dữ liệu
router.delete('/:id',(req,res)=>{
    const id = req.params.id

    ModelContact.deleteOne({
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