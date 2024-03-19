
const foodModel = require("../models/foodModel");

//create food
const createFoodController = async(req,res)=>{
    try {
        const{title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount}=req.body;
    //validation
    if(!title || !description || !price || !restaurant){
        return res.status(500).send({
            success:false,
            message:"please provide all fields"
        })
    }
    
    const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount})

    await newFood.save();
    res.status(201).send({
        success:true,
        message:"new food created successfully",
        newFood
    })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in create food api",
            error
        })
        
    }
}

//get all foods
const getAllFoodsController=async(req,res)=>{
    try {
        const foods= await foodModel.find({});
        if(!foods){
         return res.status(404).send({
            success:false,
            message:"can not find any food item"
         })
        }
        res.status(200).send({
            success:true,
            totalFood:foods.length,
            foods
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in get all food item api"
        })
        
    }
}

module.exports={createFoodController,getAllFoodsController}