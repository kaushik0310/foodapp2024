const JWT  = require('jsonwebtoken');

module.exports = async (req,res,next) =>{
    try {
        //get token
        const token = req.headers["authorization"].split(" ")[1]
        JWT.verify(token, process.env.JWT_SECRET_KEY,(err,decode)=>{
            if(err){
            return res.status(401).send({
                success:false,
                message:'Unauthorize user'
        })
    }else{
        req.body.id = decode.id;
        next()
    }
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Please provide auth token',
            error
        })
    }
}