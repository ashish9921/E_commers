const app=require("./app");
const cloudinary =require("cloudinary")
const dotenv=require("dotenv");
const connectdatabase=require("./config/database");

//we taking port no from Config File so we require Dotenv
dotenv.config({path:"BackEnd/config/config.env"});
// write line After config because bellow function take env for mongodb port just remember
// Danny its imp
connectdatabase()

const { prototype } = require("events");
const server=app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)

})
// connecting to database
connectdatabase();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRATE
})
//unhandel Promice rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err}`);
    console.log(`stutting down window due to unhandele promiss rejection`);
    server.close(()=>{
        process.exit(1);
        
    })
})