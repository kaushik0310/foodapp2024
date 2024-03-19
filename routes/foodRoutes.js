const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createFoodController, getAllFoodsController } = require("../controllers/foodController");


const router = express.Router();

//routes
//create food
router.post("/create",authMiddleware,createFoodController)

//get all foods
router.get("/getAll",getAllFoodsController)

//get single food

module.exports=router;