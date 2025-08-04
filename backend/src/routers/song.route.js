const express = require("express");
const router = express.Router()
const songModel = require("../models/song.model")
const multer = require("multer")
const uploadFile = require("../services/storage.service")
const id3 = require("node-id3")

const upload = multer({Storage: multer.memoryStorage()})


router.post('/songs',upload.single('audio'),async(req, res)=>{
       try{
       const buffer = req.file.buffer
       const base64File = Buffer.from(buffer).toString("base64")
       const response = id3.read(buffer)
       const result = await uploadFile(base64File, "music")
       const coverImageResult = await uploadFile(Buffer.from(response.image.imageBuffer).toString("base64"),'coverImage')
       
       const song = await songModel.create({
              title : response.title,
              artist : response.artist,
              album : response.album,
              releaseDate : response.year,
              audioUrl : result.url,
              coverImage : coverImageResult.url
       })
       res.status(201).json({
              message : "song added successfully",
              song
       })
       }catch(err){
        console.log(err)
        res.status(500).json({
              message :"error uploading file"
        })
       }
})


module.exports = router
