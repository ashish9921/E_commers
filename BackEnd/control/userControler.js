const User=require("../model/userMoel");
const sendTocken = require("../utils/jwtTocken");
const sendEmail=require("../utils/sendEmail")
const cloudinary =require("cloudinary")
const Crypto= require("crypto");

exports.registUser=async(req,res,next)=>{
    const {name,email,password} =req.body;
    const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale"
    })
    const user=await User.create({
        name,email,password,
        avatar:{
            public_Id:mycloud.public_id,
            url:mycloud.secure_url
        },
        
    }).then((user)=>{
        sendTocken(user,201,res)
    }).catch((err)=>{
        res.status(500).json({
            success:false,
            message:`Duplicate  ${Object.keys(err.keyValue)} Enterd`
        })
    })
    
    
}

exports.loginUser=async (req,res,next)=>{
    const {email,password}=req.body
    if (!email | !password){
        res.status(401).json({
            success:false,
            message:"please enter email or password"
            
        })
        
    }
    const user = await User.findOne({email}).select("+password")
    if (!user){
        
        res.status(401).json({
            success:false,
            message:`please enter email or password${user}`
    })
}
    
        
    
    

    const isPasswordMatched =await user.comparePassword(password).then((isPasswordMatched)=>{
        if(!isPasswordMatched){
            res.status(401).json({
                success:false,
                message:"email And Password is Wrong"
            })

        }
        sendTocken(user,200,res);
    }).catch((isPasswordMatched)=>{
        res.status(401).json({
            success:false,
            message:`please valid  
            enter email or password${isPasswordMatched}`
            
        })

    })

    
    
}

exports.logOut=async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });
    res.status(200).json({
        success:true,
        message:"Logged Out"
    });
}
//forgot Password
exports.forgotPassword = async(req,res,next)=>{
    const user =await User.findOne({email:req.body.email});
    if(!user){
        res.status(404).json({
            success:false,
            message:"user not Found"
        });
    }
    //getReset password Token
    const resetToken=user.getuserChimaPasswordToken();

    await user.save({validateBeforeSave:false})

    const resetPassword = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
    const message =`your password reset token is:-\n\n ${resetPassword} if you not requested to reset password
    then just ignore it`
    try{
        await sendEmail({
            email:user.email,
            subject:`Mega Ecommerce password recovery`,
            message,
        })
        res.status(200).json({
            success:true,
            message:`Email send to ${user.email} Successfully`
        });
        
    } catch(error){
        user.resetPasswordToken=undefined
        user.resetPasswordExpire=undefined
        await user.save({validateBeforeSave:false})

        res.status(500).json({
            success:false,
            message:error.message
        });
        
    }
}
//creating token hash

exports.ResetPassword= async(req,res,next)=>{
    const resetPasswordToken=Crypto.createHash("sha256"
    ).update(req.params.token).digest("hex")
    
    const user=await User.findOne({
        resetPasswordToken
        
    })
    if(!user){
        res.status(400).json({
            success:false,
            message:"reset password token is invalid has been expired"
        });
    }
    if(req.body.password !==req.body.confirmPassword){
        res.status(400).json({
            success:false,
            message:"password dosent match"
        });

        
    }
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    sendTocken(user,200,res);
}
//get user Detail

exports.getUserDetail =async (req,res,next)=>{
    const user=await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user,
    })
}

//update user Detaile
exports.updateUserPasss =async (req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");
    
    const isPasswordMatched =await user.comparePassword(req.body.oldPassword)
        if(!isPasswordMatched){
            res.status(401).json({
                success:false,
                message:"old password is incorect"
            })

        }
        if(req.body.newPassword !==req.body.confirmPassword){
            res.status(401).json({
                success:false,
                message:"password not mach"
            })
        }

    user.password=req.body.newPassword;
    await user.save()
    sendTocken(user,200,res)
}

//update user Profile
exports.updateUserProfile =async (req,res,next)=>{
    let newUserdata = {
        name:req.body.name,
        email:req.body.email,
        
    };

    
    if (req.body.avatar !==""){
        const user = await User.findById(req.user.id);
        const imageId =user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);
        const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            width:150,
            crop:"scale"
        })
        newUserdata.avatar={
            public_Id:mycloud.public_id,
            url:mycloud.secure_url,
        } 
    }
    const user=await User.findByIdAndUpdate(req.user.id,newUserdata,{
        new:true,
        runValidators:true,
        useFindAndModify:false


    }).catch((err)=>{
        res.status(401).json({
            success:false,
            message:'email not found'
            
        })
    }).then(()=>{
        res.status(200).json({
            success:true,
            
        })
    })
    
}

//get all users this is for admin BHayaa ha ha ha ,hi hi  
exports.getAllUser=async(req,res,next)=>{
    const user =await User.find();
    res.status(200).json({
        success:true,
        user
    })
}
//get single users this is for admin BHayaa ha ha ha ,hi hi 
exports.getSingleUser=async(req,res,next)=>{
    const user =await User.findById(req.params.id)
    if(!user){
        res.status(401).json({
            success:false,
            message:`user not exist with that is:${req.params.id}`
        })    
    }
    res.status(200).json({
        success:true,
        user
    })
}



//update user Role
exports.updateUserRole =async (req,res,next)=>{
    const newUserdata={
        name:req.body.name,
        email:req.body.email,
        roll:req.body.roll
    } 


    const user=await User.findByIdAndUpdate(req.params.id,newUserdata,{
        new:true,
        runValidators:true,
        useFindAndModify:false


    }).catch((err)=>{
        res.status(401).json({
            success:false,
            message:'email not found'
            
        })
    })
    
    res.status(200).json({
        success:true,
        
    })
}


//Delete User
exports.DeleteUser =async (req,res,next)=>{
    const user=await User.findById(req.params.id).catch(()=>{
        
    })
    if(!user){
        return next(
        res.status(401).json({
            success:false,
            message:`${req.params.id}this user not exist`
            
        })     )
    }
    await user.remove();
    res.status(200).json({
        success:true,
        
    })
}

