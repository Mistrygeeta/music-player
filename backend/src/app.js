const express = require("express");
const songRoutes = require("./routers/song.route")
const cors = require("cors")
const app = express()

app.use(cors({
  origin: ["http://music-player-three-omega.vercel.app"], // <-- your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

app.use(express.json())

app.use("/", songRoutes)

module.exports= app;