const sendTocken=(user,statusCode,res)=>{
    const token =user.getJWTToken();
    //cockies
    const option ={
    expires:new Date(
        Date.now() + process.env.COCKIE_EXPIRE * 24*60*60*1000
    ),
    httpOnly:true,
    };
    res.status(statusCode).cookie("token",token,option).json({
        success:true,
        user,
        token


    })
}
module.exports=sendTocken