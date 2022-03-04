const jwt=require("jsonwebtoken");
const { removeListener } = require("../model/userMoel");
const User=require("../model/userMoel");
exports. isAuthenticatedUser = async(req, res,next)=>{
    const {token} =req.cookies;
    
    if(!token){
        res.status(401).json({
            success:false,
            message:`please login to Acsess this Sorce `
    })
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRATE);
    
    req.user=await User.findById(decodedData.id);

    next();
    
};

exports.authoriseRoll=(...role)=>{
    return(req,res,next)=>{
        if (!role.includes(req.user.roll) ){
            return next(res.status(403).json({
                success:false,
                message:`role :${req.user.roll} not allow to access this function`
        }))      
        }
        next();
    }
}