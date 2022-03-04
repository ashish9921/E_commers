const mongoose=require("mongoose");
validator=require('validator');
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken")
const Crypto= require("crypto");

const userSchima= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"],
        maxLength:[30,"name canot exccid 30 char"],
        minLenght:[4,"name shuld have more than 4 chr"],
        
    },
    email:{
        type:String,
        required:[true,"please Enter Email"],
        unique:true,
        validate:[validator.isEmail,"please Enter Valid email"]
        
    },
    password:{
        type:String,
        required:[true,"please enter the password"],
        minLenght:[8,"password shuld have more than 8 "],
        select:false
    },
    avatar:
        {
            public_Id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
    },
    roll:{
        type:String,
        default:"user"

    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date

})
userSchima.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
})
//jwt token
userSchima.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRATE,{
        expiresIn:process.env.JWT_EXPIRE
    })


}
userSchima.methods.comparePassword=async function(entertdPassword){
    return await bcrypt.compare(entertdPassword,this.password)
}
userSchima.methods.getuserChimaPasswordToken=function(){
    //hashing and adding token value
    const resetToken=Crypto.randomBytes(20).toString("hex")
    this.resetPasswordToken=Crypto.createHash("sha256"
    ).update(resetToken).digest("hex")
    this.resetPasswordExpire=Date.now()*15*60*1000;
    return resetToken
}
module.exports=mongoose.model("user1",userSchima);

