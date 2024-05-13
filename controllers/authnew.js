// module.exports={
//     registerController: async(req,res)=>{
//     try {
//         const {userName,email,password,phone,address,answer,userType}=req.body;
//         //validation
//         if(!userName || !email || !password || !address || !phone ||!answer){
//             return res.status(500).send({
//                 success:false,
//                 message:'Please provide all fields'
//             })
//         }
//         //check user
//         const existing = await userModel.findOne({email});
//         if (existing){
//             return res.status(500).send({
//                 success:false,
//                 message:'Email Already registered please login'
//             })
//         }
//         //hashing password
//         const hashedPassword = await bcrypt.hash(password,10);

//         //create new user
//         const user = await userModel.create({
//             userName,
//             email,
//             password:hashedPassword,
//             address,
//             phone,
//             answer,
//             userType
//         })
//         res.status(201).send({
//             success:true,
//             message:'Successfully Registered',
//             user
//         })

        
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success:false,
//             message:"error in registering user",
//             error
//         })
        
//     }
// },

// //POST || LOGIN
// loginController : async(req,res)=>{
//     try {
//         const {email,password} = req.body;
//         //validation
//         if(!email || !password){
//             return res.status(500).send({
//                 success:false,
//                 message:"Please provide email and password",
//             })
//         }   
//         //check user 
//         const user = await userModel.findOne({email});
//         if(!user){
//             return res.status(404).send({
//                 success: false,
//                 message:"User not found ",
//             })
//         }
//         //check user password | compare password
//         const isMatch = await bcrypt.compare(password,user.password);
//         if(!isMatch){
//             return res.status(500).send({
//                 success:false,
//                 message:"Invalid Credentials"
//             })
//         }
//         const token = JWT.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"7d"})

//         user.password=undefined;
//         res.status(200).send({
//             success:true,
//             message:"Login successfully",
//             token,
//             user,
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success:false,
//             message:'Error in Login API',
//             error
//         })
        
//     }
// },

// }