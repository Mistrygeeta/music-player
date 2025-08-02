const express = require("express");
const router = express.Router()
const songModel = require("../models/song.model")
const multer = require("multer")
const uploadFile = require("../services/storage.service")

const upload = multer({Storage: multer.memoryStorage()})


router.post('/songs',upload.single('audio'),async(req, res)=>{
       const buffer = req.file.buffer
       const base64File = Buffer.from(buffer).toString("base64")
       const result = await uploadFile(base64File, "music")
       
       console.log(result)
})


module.exports = router
