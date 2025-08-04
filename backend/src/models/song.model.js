const mongoose = require("mongoose");


const songSchema = new mongoose.Schema({
    title : String,
    artist : String,
    album : String,
    releaseDate : String,
    audioUrl : String,
    coverImage :String
})


const songModel = mongoose.model("songs", songSchema);

module.exports = songModel;