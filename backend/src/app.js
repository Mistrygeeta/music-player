const cors = require("cors")
const express = require("express");
const songRoutes = require("./routers/song.route")

const app = express()

app.use(cors({
  origin: ["http://localhost:5173",
    "http://music-player-three-omega.vercel.app",
    "https://music-player-three-omega.vercel.app"
  ], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

app.use(express.json())

app.use("/", songRoutes)

module.exports= app;