const express=require("express");
const app=express();
const cookiParser=require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")
app.use(express.json())
app.use(cookiParser());
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
// rout import
const product=require("./root/productRoot");
const user=require("./root/userRout")
const order=require("./root/orderRout")
app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)


//Middelware for errors

module.exports=app

