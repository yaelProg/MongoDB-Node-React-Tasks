
const User = require("../models/Users")
    //לפי קריטריונים
const getAllUsers = async (req, res)=>{
    if(req.user.roles=="admin"){
    const users = await User.find().lean()
    if(!users?.length){
        return res.send(null)
    }
    res.json(users)
}
else{
    return res.status(404).json({message: 'oops - Not found!! '})
    
}
}
const createNewUser = async(req, res)=> {
    if(req.user.roles=="admin"){
    const {firstName, lastName, userName,roles, email,adderss, phone, password}= req.body
    if(!userName)
    return res.status(400).json({message:'user name is required'})
const newUser = await User.create({firstName, lastName, username:userName, email,adderss, phone, roles, password})
if(newUser){
    return res.status(201).json({message: 'New user created'})
}
    else{
return res.status(400).json({message: 'Invalid user'})
}
}
else{
    return res.status(403).json({message: 'Oops - Not alowd here!!!'})

}}
const updateUser = async (req, res)=>{
    if(req.user.roles=="admin"){
    const{_id, firstName, lastName, userName, email,adderss, phone} = req.body
  
    const user = await User.findById(_id).exec()
    if(!user){
        return res.status(404).json({message: 'User not found'})
    }
    if(!userName){
        userName = user.userName
    }
    user.firstName = firstName
    user.lastName=lastName
    user.username =userName
    user.email = email
    user.address = adderss
    user.phone = phone
    user.password = user.password
      

    const updatedUser = await user.save()
    res.json(`'${updatedUser.title}' updated`)
}
else{
    return res.status(404).json({message: 'Oops - Not found!!!'})

}
    }

    const deleteUser = async (req, res)=>{
    
        if(req.user.roles=="admin"){
        try{
        const {id} = req.params
        const user = await User.findById(id).exec()
         if(!user){
            return res.status(400).json({message: 'User not found'})
         }
        const result = await user.deleteOne()
        const reply = `User '${result.username}' ID ${result._id} deleted`
        res.json(reply)
        }
        catch{
            return res.status(404).json({message: 'not found'})
        }
    }
    else{
    return res.status(403).json({message: 'Oops - unauthorized!!!'})
        
    }
    }





module.exports = {
    createNewUser,
    getAllUsers,
    updateUser,
    deleteUser
}


    


