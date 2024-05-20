
const Post = require("../models/Posts")
const createNewPost = async(req, res)=> {
    const {title, body, likes }= req.body
    if(!title)
    return res.status(400).json({message:'title is required'})
const post = await Post.create({title, body, likes: 0})
if(post){
    return res.status(201).json({message: 'New post created'})
}
    else{
return res.status(400).json({message: 'Invalid post'})
}}

    //לפי קריטריונים
const getAllPosts = async (req, res)=>{
    const posts = await Post.find().lean()
    if(!posts?.length){
        return res.send(null)
    }
    res.json(posts)
}

const updatePost = async (req, res)=>{
    const{_id,title, body, likes} = req.body
    if(!_id || !title){
        return res.status(400).json({message: 'fields are required'})
    }
    const post = await Post.findById(_id).exec()
    if(!post){
        return res.status(400).json({message: 'Post not found'})
    }
    post.title = title
    post.body = body
    post.likes = likes
      

    const updatedPost = await post.save()
    res.json(`'${updatedPost.title}' updated`)
    }

    const deletePost = async (req, res)=>{
        try{
        const {id} = req.params
        const post = await Post.findById(id).exec()
         if(!post){
            return res.status(400).json({message: 'Post not found'})
         }
        const result = await post.deleteOne()
        const reply = `Post '${result.title}' ID ${result._id} deleted`
        res.json(reply)
        }
        catch{
            return res.status(404).json({message: 'not found'})
        }

    }



module.exports = {
    createNewPost,
    getAllPosts,
    updatePost,
    deletePost,
}


    


