const mongoose = require("mongoose");
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true

    },
    description:{
        type:String,
        required:[true,"please Enter Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter Price"],
        maxLength:[8,"please cannot excess 8 characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    Images:[
        {
        public_Id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
    ],

    category:{
        type:String,
        required:true
    },
    Stock:{
        type:Number,
        required:[true,"please prodcut Stock"],
        maxLength:[4,"Stock Cannot excead 4 character"],
        default:1
    },
    numOfRevies:{
        type:Number,
        default:0
        
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"user1",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            reting:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user1",
        required:true
    },
        
    
    createdAt:{
        type:Date,
        default:Date.now
    }
        
})

module.exports=mongoose.model("product",productSchema);