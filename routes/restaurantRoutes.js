const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createRestaurantController, getAllRestaurantController, getRestaurantByIdController, deleteRestaurant } = require("../controllers/restaurantController");

const router = express.Router();

//routes

//create restaurant || post
router.post("/create",authMiddleware,createRestaurantController)

// get all restaurants || get
router.get("/getAll",getAllRestaurantController)

// get restaurant || get
router.get("/get/:id",getRestaurantByIdController)

//delete restaurant || delete
router.delete("/delete/:id",deleteRestaurant)

module.exports=router;