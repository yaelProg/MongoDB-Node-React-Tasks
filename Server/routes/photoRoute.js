const express = require("express")
const router = express.Router()
const Photo = require ("../models/Photos")
const controller = require("../controllers/photosController")
const verifyJWT = require("../middleware/verifyJWT")
const multer=require('multer')
// const storage = require('../middleware/multer')
  
// const upload = multer({ storage: storage }) 
// const multer=require("multer");
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,__dirname+"/public/uploads")
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now()+"-"+Math.random(Math.random()*1E9)
        cb(null,uniqueSuffix+"-"+file.originalname)
    }
})
module.exports=storage
const upload = multer({storage:storage})


router.use(verifyJWT)
router.get("/",controller.getAllPhotos )
router.post("/",upload.single("picture"),controller.createNewPhoto )
router.delete("/:id",controller.deletePhoto )
router.put("/",upload.single("picture"),controller.updatePhoto )


module.exports = router