const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createFoodController, getAllFoodsController, getFoodController,
     getFoodByRestaurantController, updateFoodController,
      deleteFoodController, placeOrderController, orderStatusController } = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");


const router = express.Router();

//routes
//create food
router.post("/create",authMiddleware,createFoodController)

//get all foods
router.get("/getAll",getAllFoodsController)

//get single food
router.get("/get/:id",getFoodController)

//get food by restaurant
router.get("/getFoodByRes/:id",getFoodByRestaurantController)

//update food by id
router.put("/update/:id",updateFoodController)

//update food by id
router.delete("/delete/:id",deleteFoodController)

//place order
router.post("/placeOrder",authMiddleware,placeOrderController)

//order status
router.post("/orderStatus/:id",authMiddleware,adminMiddleware,orderStatusController)

module.exports=router;