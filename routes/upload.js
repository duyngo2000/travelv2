const express = require('express')
const ModelTour = require('../models/tour.js')
const multer = require('multer')
const router = express.Router()

const storage = multer.diskStorage({
    destination: function(res, file, cb){
        cb(null, './upload')
    },
    filename: function(res, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})


//lấy tất cả dữ liệu
router.get('/',(req,res)=>{
    res.send("hello")
})


//thêm mới dữ liệu
router.post('/', upload.single("upload"), (req,res)=>{

    const file = req.file.path

    res.status(200).json(
        {
            uploaded: true,
            url: `https://traveol.herokuapp.com/${file.replace("\\","/")}`
        }
    )
})



module.exports = router