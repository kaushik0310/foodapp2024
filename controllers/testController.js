const testUserController = (req,res)=>{
   try {
       res.status(200).send({
        success:true,
        message:'test user data api',
       })
   } catch (error) {
    console.log('errror in test api',error);
    
   }
    
};

module.exports = {testUserController};