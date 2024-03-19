const express = require("express");
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const { deleteCatController } = require("../controllers/categoryController");

const router = express.Router();

//routes
//GET USER|| GET
router.get("/getUser",authMiddleware, getUserController)

//UPDATE PROFILE
router.put("/updateUser",authMiddleware,updateUserController)

//UPDATE PASSWORD
router.post("/updatePassword",authMiddleware,updatePasswordController)

//RESET PASSWORD
router.post('/resetPassword', authMiddleware, resetPasswordController)

//delete user

router.delete("/deleteUser/:id",authMiddleware, deleteCatController)





module.exports=router;