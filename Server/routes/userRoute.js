const express = require("express")
const router = express.Router()
const User = require ("../models/Users")
const controller = require("../controllers/usersController")
const verifyJWT = require("../middleware/verifyJWT")
router.use(verifyJWT)
router.get("/",controller.getAllUsers)
router.post("/",controller.createNewUser )
router.delete("/:id",controller.deleteUser )
router.put("/",controller.updateUser )


module.exports = router