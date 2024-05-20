const express = require("express")
const router = express.Router()
const Todos = require ("../models/Todos")
const controller = require("../controllers/todosController")
const verifyJWT = require("../middleware/verifyJWT")
router.use(verifyJWT)
router.get("/",controller.getAllTodos)
router.post("/",controller.createNewTodo )
router.delete("/:id",controller.deleteTodo )
router.put("/",controller.updateTodo )
router.put("/complete",controller.updateTodoComplete )


module.exports = router