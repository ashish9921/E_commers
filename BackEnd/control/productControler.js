const { findById, findByIdAndUpdate } = require("../model/productModel");
const Product=require("../model/productModel");
const Apifeature = require("../utils/ApiFeature");

// Create product bro  And Addmin only
exports.createProduct=async(req,res,next)=>{
    req.body.user=req.user.id
    const product = await Product.create(req.body).then((product)=>{
        res.status(201).json({
            success:true,
            product
        })
    }).catch((err)=>{
        res.status(500).json({
            success:false,
            message:`some fildse missing${err}`
            
        })
    })
    
}
// get all product
exports.getAllProducts=async(req,res)=>{
    

    const resultPerPage=8;
    const productCount=await Product.countDocuments();

    const apiFeature=new Apifeature(Product.find(),req.query).search().fealter()
    let  productss=  apiFeature.query
    let filterdProductCount=productss.length;

    apiFeature.pagination(resultPerPage)
    const products=await apiFeature.query.then((products)=>{
        
        res.status(200).json({
            success:true,
            products,
            productCount,
            resultPerPage,
            filterdProductCount
    })
    }).catch(()=>{
        res.status(500).json({
            success:false
            
    })
  
})
}
// get product Details Ashish 
exports.getProductDetails=async(req,res,next)=>{
    const product =await Product.findById(req.params.id).then((product)=>{
    
            res.status(200).json({
                success:true,
                product
            })
    
}).catch((err)=>{
    res.status(500).json({
        success:false,
        message:"this product not found"
})    
})
    


}
// update product by id Bhayaji
exports.updateProduct=async(req,res,next)=>{
    const newUserdata={
        name:req.body.name,
        email:req.body.price,
        Images:req.body.Images,
        category:req.body.category

        
    } 
    
      const  product= Product.findByIdAndUpdate(req.params.id,newUserdata,
            {
                new:true,
                runValidators:true,
                useFindAndModify:false
                
            }).then((product)=>{

                res.status(200).json({
                    success:true,

                    product
                })
            }).catch((err)=>{

            res.status(500).json({
            success:false,
            message:`product not found or invalid filde${err}`
        })
    })
    }
// delete produt by id Bhayaji
exports.deletProduct=async(req,res,next)=>{
    const product=await Product.findById(req.params.id).then((product)=>{
        product.remove();
        res.status(200).json({
        success:true,
        message:"product deleted successly"
    })
    }).catch((err)=>{
        res.status(500).json({
        success:false,
        message:"product not found"
    })  
    })
}
//create review and update review

exports.createProductReview=async (req,res,next)=>{
    const{reting,comment,productID}=req.body
    const review={
        user:req.user._id,
        name:req.user.name,
        reting:Number(reting),
        comment 
    }
    const product=await Product.findById(productID)
    const isreview=await product.reviews.find(rev=>rev.user.toString()==req.user._id.toString())
    //rev=>rev.user.toString =user id inside all reviess is equle to letest user id

    if(isreview){
        product .reviews.forEach(rev=>{
            if(rev.user.toString()==req.user._id.toString()){
                rev.reting=reting,
                rev.comment=comment
            }
            
        })
    }
    else{
        product.reviews.push(review)
        product.numOfRevies=product.reviews.length
    }
    let avg=0
    product.reviews.forEach((rev)=>{
        avg+=rev.reting
    })
    
    product.ratings=avg/product.reviews.length
    
    await product.save({validateBeforSave:false})
    res.status(200).json({
        success:true,
        
    })
}
//get all revies of all product
exports.getProductReviews=async(req,res,next)=>{
    const product=await Product.findById(req.query.id);
    if(!product){
        res.status(404).json({
            success:true,
            message:`product not found`
        })
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
}

exports.deleteReview=async(req,res,next)=>{
    const product=await Product.findById(req.query.productID);
    if(!product){
        res.status(404).json({
            success:false,
            message:`product not found`
        })
    }
    const reviews=product.reviews.filter((rev)=>rev._id.toString() !==req.query.id.toString())

    let avg=0
    reviews.forEach((rev)=>{
        avg+=rev.reting
    })
    
    const ratings=avg/reviews.length

    const numOfRevies=reviews.length;
    await Product.findByIdAndUpdate(
        req.query.productID,
    {
        reviews,
        ratings,
        numOfRevies
    },
    {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        
    })


}