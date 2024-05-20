const express = require("express")
const router = express.Router()
const Photo = require ("../models/Photos")
const controller = require("../controllers/photosController")
const verifyJWT = require("../middleware/verifyJWT")
router.use(verifyJWT)
router.get("/",controller.getAllPhotos )
router.post("/",controller.createNewPhoto )
router.delete("/:id",controller.deletePhoto )
router.put("/",controller.updatePhoto )


module.exports = router