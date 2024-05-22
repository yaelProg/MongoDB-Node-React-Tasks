const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "/public/uploads")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.random(Math.random() * 1E9)
        cb(null, uniqueSuffix + "-" + file.originalname)
    }
})
module.exports = storage
// const upload = multer({storage:storage})
