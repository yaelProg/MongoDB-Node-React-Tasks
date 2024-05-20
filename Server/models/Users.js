const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
   firstName:{
        type:mongoose.Schema.Types.String,
        required: true
    },
   lastName:{
        type:mongoose.Schema.Types.String,
        required: true
    },
    username:{
        type:mongoose.Schema.Types.String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    roles:{
        type:mongoose.Schema.Types.String,
        enum: ["user", "admin"],
        default: "user"
    },
    email:{
        type:mongoose.Schema.Types.String,
    },
    address:{
        type:mongoose.Schema.Types.String,
        
    },
    phone:{
        type:mongoose.Schema.Types.String,
       
    },
   

}
    ,
    
       { timestamps: true}

)

module.exports = mongoose.model('User', userSchema)