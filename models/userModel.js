const mongoose = require("mongoose")

//schema
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, 'user name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true,'phone number is required']
    },
    userType:{
        type:String,
        required:[true,'user type is required'],
        enum:['client','admin','vendor','driver'],
        default:'client'
    },
    profile:{
        type: String,
        default:"https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179865.jpg"
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
},
{timestamps:true}
);

//export
module.exports = mongoose.model("User", userSchema);