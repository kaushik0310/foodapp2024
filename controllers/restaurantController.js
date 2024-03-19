
//create restaurant 

const restaurantModel = require("../models/restaurantModel");

const createRestaurantController= async(req,res)=>{
    try {
        const{
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords

        }=req.body;
        
    //validation
    if(!title || !coords){
        return res.status(500).send({
            success:false,
            message:"please provide title and address of restaurant"
        })
    }
    
    const newRestaurant = new restaurantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords
        })
    await newRestaurant.save();
    res.status(201).send({
        success:true,
        message:"restaurant created successfully",
        newRestaurant
    })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in create restaurant API",
            error
        })
        
    }
}

//get all restaurants
const getAllRestaurantController = async(req,res)=>{
    try {
        const restaurants = await restaurantModel.find({});
        if(!restaurants){
        return res.status(404).send({
            success:false,
            message:"no restaurant available"
        })
        }
        res.status(200).send({
            success:true,
            totalCount:restaurants.length,
            restaurants
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in gel all restaurant api",
            error
        })

        
    }
}

//get restaurant by id

const getRestaurantByIdController=async(req,res)=>{
    try {
        const restaurantId = req.params.id;
        if(!restaurantId){
            return res.status(404).send({
                success:false,
                message:"restaurantId not found"
            })
        }

        //get restaurant
        const restaurant= await restaurantModel.findById(restaurantId);
        if(!restaurant){
            return res.status(404).send({
                success:false,
                message:"no restaurant found"
            })
        }
        res.status(200).send({
            success:true,
            restaurant
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in get restaurant by id api",
            error
        })
        
    }
}

//delete restaurant
const deleteRestaurant=async(req,res)=>{
   
    try { const restaurantId=req.params.id;
        if(!restaurantId){
            return res.status(404).send({
                success:false,
                message:"restaurant not found or provide correct restaurant api"
            })
        }
        await restaurantModel.findByIdAndDelete(restaurantId);
        res.status(200).send({
            deleteStatus:true,
            message:"restaurant deleted successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in delete restaurant api"
        })
        
    }
}



module.exports =  { createRestaurantController,getAllRestaurantController,getRestaurantByIdController,deleteRestaurant }