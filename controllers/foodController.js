
const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel")

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

const getFoodController = async(req,res)=>{
    try {
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:"please provide  id"
            })
        }
        const food = await foodModel.findById(foodId);
        if(!food){
            return res.status(404).send({
                success:false,
                message:"no food found with this id "
            })
        }
        res.status(200).send({
            success:true,
            food
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in get food api",
            error
        })
    }
}

//get food by restaurant
const getFoodByRestaurantController = async(req,res)=>{
    try {
        const restaurantId = req.params.id;
        if(!restaurantId){
            return res.status(404).send({
                success:false,
                message:"please provide restaurant id"
            })
        }
        const food = await foodModel.find({restaurant:restaurantId});
        if(!food){
            return res.status(404).send({
                success:false,
                message:"no food found with this restaurant id "
            })
        }
        res.status(200).send({
            success:true,
            food
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in get food by restaurantId api",
            error
        })
    }
}

//update food

const updateFoodController =async(req,res)=>{
    try {
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:"foodId not found"
            })
        }
        const food = await foodModel.findById(foodId);
        if(!food){
            return res.status(404).send({
                success:false,
                message:"no food found with this id"
            })
        }

        const{
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
            ratingCount }=req.body;

        const updatedFood = await foodModel.findByIdAndUpdate(foodId,{ title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount},{new:true});

        if(!updatedFood){
            return res.status(500).send({
                success:false,
                message:"can not update food"
            })
        }

        res.status(201).send({
            success:true,
            message:"food updated successfully",
            updatedFood
        })
    
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in food update api",
            error
        })
        
    }
};

//delete food

const deleteFoodController =async(req,res)=>{
    try {
      const  foodId = req.params.id;
      if (!foodId) {
            return res.status(404).send({
              success:false,
              message:"no food id found"
            })
        }
    const food = await foodModel.findById(foodId);
    if(!food){
        return res.status(404).send({
            success:false,
            message:"can not find food with this id"
        })
    }

    await foodModel.findByIdAndDelete(foodId)
    res.status(200).send({
        success:true,
        message:"food item deleted successfully"
    })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in food delete api",
            error
        })
        
    }
}

//place order
const placeOrderController=async(req,res)=>{
    try {
        const{cart}=req.body;
        if(!cart ){
            return res.status(500).send({
                success:false,
                message:"please add food cart"
            })
        }
        let total = 0;
        //calculation
        cart.map((i)=>{
            total += i.price
        })

        const newOrder = new orderModel({
            foods:cart,
            payment:total,
            buyer:req.body.id
        });

        await newOrder.save();    
        res.status(201).send({
            success: true,
            message: "Order placed successfully",
            newOrder
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in place order api",
            error
        })
        
    }
};

//order status
const orderStatusController=async(req,res)=>{
    try {
        const orderId = req.params.id;
        if(!orderId){
            return res.status(404).send({
                success:false,
                message:"please provide valid order id"
            })
        }

        const {status}=req.body;

        const order = await orderModel.findByIdAndUpdate(orderId,{status},{new:true});
        res.status(201).send({
            success:true,
            message:"order status updated successfully",
            order
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in order status api",
            error
        })
        
    }
}


module.exports={createFoodController,getAllFoodsController,getFoodController,
    getFoodByRestaurantController,updateFoodController,
    deleteFoodController,placeOrderController,orderStatusController}