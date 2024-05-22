const express = require("express")
const router = express.Router()
const Post = require("../models/Posts")
const controller = require("../controllers/postsController")
const verifyJWT = require("../middleware/verifyJWT")

router.use(verifyJWT)
router.get("/", controller.getAllPosts)
router.post("/", controller.createNewPost)
router.delete("/:id", controller.deletePost)
router.put("/", controller.updatePost)

module.exports = router