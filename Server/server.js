require("dotenv").config()
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const { default: mongoose } = require("mongoose")
const PORT = process.env.PORT || 7001
const app = express()
connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.use("/api/posts", require("./routes/postRoute"))
app.use("/api/photos", require("./routes/photoRoute"))
app.use("/api/todos", require("./routes/todoRoute"))
app.use("/api/users", require("./routes/userRoute"))
app.use("/api/functionToken/:token", require("./middleware/functionToken"))
app.use("/api/auth", require("./routes/authRoute"))
app.get("/", (req, res) => {
    res.send("this is the home page")
})
app.get('/uploads/:filename', (req, res) => {
    const imagePath = path.join(__dirname, '/public/uploads/', req.params.filename);
    res.sendFile(imagePath, { headers: { 'Content-Type': 'image/jpeg' } });
});

app.use('/uploads', express.static(__dirname + '/public/uploads'));

mongoose.connection.once('open', () => {
    console.log('connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
        console.log(process.env.NODE_ENV)
    })
})

mongoose.connection.on('error', err => {
    console.log(err)
})