
const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
//GET USER INFO

const getUserController=async(req,res)=>{
           try {
            //find user
            const user = await userModel.findById({_id:req.body.id})
            //validation
            if(!user){
                return res.status(404).send({
                    success:false,
                    message:'User Not Found'
                })
            }
            //hide password
            user.password = undefined;
            //resp
            res.status(200).send({
                success:true,
                message:"user get successfully",
                user
            });
    
           } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message:'Error in Get User API',
                error
            })
            
           }
        }

    //UPDATE USER
const updateUserController = async(req,res)=>{
    try {
        //find user
        const user= await userModel.findById({_id:req.body.id})
        //validation
        if (!user){
            return res.status(404).send({
                success:false,
                message:'user not found',
            })
        }
        //update
        const{userName,address,phone}=req.body;
        if(userName) user.userName = userName;
        if(address) user.address = address;
        if(phone) user.phone = phone;
        //save user
        await user.save();
        res.status(200).send({
            success: true,
            message: "User Updated Successfully"
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in update user app',
            error
        })
        
    }
}

  //RESET PASSWORD
const resetPasswordController = async(req,res)=>{
    try {
        const{email, newPassword, answer}=req.body;
        if(!email || ! newPassword || !answer) {
            return response.status(500).send({
                success:false,
                message:'Please Provide All Fields'
            })
        }
            const user = await userModel.findOne({email,answer})
            if(!user){
                return res.status(500).send({
                    success:false,
                    message:'User not found or invalid answer'
                })
            }
              //hashing password
        const hashedPassword = await bcrypt.hash(newPassword,10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success:true,
            message:'password updated successfully',
            user,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in password RESET api',
            error
        })
        
    }
};

//UPDATE PASSWORD

const updatePasswordController =async(req,res)=>{
   try {
  
     //find user
     const user = await userModel.findById(req.body.id)
     // const user = await userModel.findById({_id:req.body.id})

     if(!user){
        return res.status(404).send({
            success:false,
            message:"user not found"
        })
     };

     //get data from user
     const {oldPassword, newPassword} = req.body;
     if(!oldPassword || !newPassword){
       return res.status(500).send({
            success:false,
            message:"please provide old and new password"
        })
     }

    
      //compare old password
      const isMatch = await bcrypt.compare(oldPassword,user.password);
      if(!isMatch){
          return res.status(500).send({
              success:false,
              message:"Invalid old password"
          })
      }

           //hashing password
           const hashedPassword = await bcrypt.hash(newPassword,10);
           user.password = hashedPassword;
           await user.save();
           res.status(200).send({
               success:true,
               message:'password updated successfully',
               user,
           })

   } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"error in update password API",
        error
    })
    
   }

}

const deleteProfileController =async(req,res)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success:true,
            message:"Your account has been deleted successfully",

        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in delete profile api",
            error
        })
        
    }
}
module.exports={getUserController,updateUserController,resetPasswordController,updatePasswordController,deleteProfileController}