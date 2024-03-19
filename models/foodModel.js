const mongoose = require("mongoose")

//schema
const foodSchema = new mongoose.Schema(
    {
     title:{
        type:String,
        required:[true, 'Food title is required']
     },
     description: {
        type: String,
        required:[true, "food description is required"]
     },
     price:{
        type: Number,
        required:[true, "food price is required"]
     },
     imageUrl:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3D%2522food%2Blogo%2522&psig=AOvVaw3PMSAAkpCJ8TX5rifQJ2g1&ust=1710922596386000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKDj2rzx_4QDFQAAAAAdAAAAABAO"
     },
     foodTags:{
        type:String,
     },
     category:{
        type:String,
     },
     code:{
        type:String,
     },
     isAvailable:{
        type:Boolean,
        default:true,
     },
     restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
     },
     rating:{
        type:Number,
        default:5,
        min: 1,
        max: 5
     },
     ratingCount: {
        type: String
     }
},
{timestamps:true}
);

//export
module.exports = mongoose.model("Food",foodSchema);