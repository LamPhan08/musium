const { ZingMp3 } = require("zingmp3-api-full")
const path = require('path')
const express = require("express")
require('dotenv').config()
const app = express()
const cors = require("cors")
const mongoose = require('mongoose')
const authRoute = require('./server/routes/auth')
const userRoute = require('./server/routes/userRouter')
const favoritesRoute = require('./server/routes/favoriteSongsRouter')
const exploreRoute = require('./server/routes/exploreRouter')
const playlistRoute = require('./server/routes/playlistRouter')
const commentRoute = require('./server/routes/commentRouter')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000

const corsOptions = {
    origin: true,
    credentials: true
};

// database connection
mongoose.set("strictQuery", false);
const connect = async() => {
    try {
      await  mongoose.connect(process.env.MONGO_URI)
      console.log("Mongo database is connected")
    } catch (error) {
        console.log("Mongo database is failed to connect")
    }
};

// Page Home
app.get("/", (req, res) => {
    res.send('SERVER ON')
    
})

// ZingMp3Router
const ZingMp3Router = require("./server/routes/ZingRouter")
app.use("/api", cors({ origin: '*' }), ZingMp3Router)

// Page Error
// app.get("*", (req, res) => {
//     res.send("Nhập Sai Đường Dẫn! Vui Lòng Nhập Lại >.<")
// });

// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1', favoritesRoute)
app.use('/api/v1', exploreRoute)
app.use('/api/v1', playlistRoute)
app.use('/api/v1', commentRoute)

app.listen(port, () => {
    connect()
    console.log(`Start server listen at http://localhost:${port}`)
});



