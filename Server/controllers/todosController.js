
const Todo = require("../models/Todos")
const createNewTodo = async (req, res) => {
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

//לפי קריטריונים
const getAllTodos = async (req, res) => {
    const todos = await Todo.find().lean()
    // if(!todos?.length){
    //     res.send(null)
    // }
    if (!todos?.length) {
        return res.send(null)
    }
    res.json(todos)
}

const updateTodo = async (req, res) => {
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


const updateTodoComplete = async (req, res)=>{
    const {id}= req.body
    const todo = await Todo.findById(id).exec()
    if(!todo){
        return res.status(404).json({message: 'Todo not found'})
    }
    todo.completed = !todo.completed
    const updatedTodo = await todo.save()
    res.json(`'${updatedTodo.name}' updated`)
}
module.exports = {
    createNewTodo,
    getAllTodos,
    updateTodo,
    deleteTodo,
    updateTodoComplete
}





