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