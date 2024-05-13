const mongoose = require("mongoose")

//schema
const categorySchema = new mongoose.Schema(
    {
       title: {
        type: String,
        required:[true, "category title is required"],
       },
       imageUrl: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsimilarpng.com%2Fgood-food-logo-design-on-transparent-background-png%2F&psig=AOvVaw3PMSAAkpCJ8TX5rifQJ2g1&ust=1710922596386000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKDj2rzx_4QDFQAAAAAdAAAAABAE"
       },
},
{timestamps:true}
);

//export
module.exports = mongoose.model("Category",categorySchema);