
const Todo = require("../models/Todos")
const createNewTodo = async (req, res) => {
    try {
        const { title, tags, completed } = req.body
        if (!title)
            return res.status(400).json({ message: 'title is required' })
        const todo = await Todo.create({ title, tags, completed })
        if (todo) {
            return res.status(201).json({ message: 'New todo created' })
        }
        else {
            return res.status(400).json({ message: 'Invalid todo' })
        }
    }
    catch (err) {
        console.log(err)
    }
}

//לפי קריטריונים
const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find().lean()
        // if(!todos?.length){
        //     res.send(null)
        // }
        if (!todos?.length) {
            return res.send(null)
        }
        res.json(todos)
    }
    catch (err) {
        console.log(err)
    }
}

const updateTodo = async (req, res) => {
    try {
        const { _id, title, tags } = req.body
        if (!_id || !title) {
            return res.status(400).json({ message: 'fields are required' })
        }
        const todo = await Todo.findById(_id).exec()
        if (!todo) {
            return res.status(400).json({ message: 'Todo not found' })
        }
        todo.title = title
        todo.tags = tags
        const updatedTodo = await todo.save()
        res.json(`'${updatedTodo.name}' updated`)
    }
    catch (err) {
        console.log(err)
    }
}

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        const todo = await Todo.findById(id).exec()
        if (!todo) {
            return res.status(400).json({ message: 'Todo not found' })
        }
        const result = await todo.deleteOne()
        const reply = `Todo '${result.title}' ID ${result._id} deleted`
        res.json(reply)
    }
    catch {
        return res.status(404).json({ message: 'not found' })
    }
}

const updateTodoComplete = async (req, res) => {
    try {
        const { id } = req.body
        const todo = await Todo.findById(id).exec()
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' })
        }
        todo.completed = !todo.completed
        const updatedTodo = await todo.save()
        res.json(`'${updatedTodo.name}' updated`)
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = {
    createNewTodo,
    getAllTodos,
    updateTodo,
    deleteTodo,
    updateTodoComplete
}





