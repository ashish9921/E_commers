const Order=require("../model/orderModel");
const Product=require("../model/productModel");

//create new order
exports.newOrder=async(req,res,next)=>{
    const {shippingInfo,orderItems,paymentInfo,ItemsPrice,TaxPrice,shippingPrice,TotlePrice}=req.body;

    const order=await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    ItemsPrice,
    TaxPrice,
    shippingPrice,
    TotlePrice,
    PaidAt:Date.now(),
    user:req.user._id,
    })

    res.status(201).json({
        success:true,
        order,
    })
}
//get single order
exports.getsingleOrder=async(req,res,next)=>{
    const order= await Order.findById(req.params.id).populate(
        {
            path:"user",
            select:"name email"
        }
    );

    if (!order){
        res.status(404).json({
            success:false,
            Message:`order not found with that id :`
        })
    }
    
    res.status(200).json({
        success:true,
        order
    })
}
//get loged in user order 
exports.myOrder=async(req,res,next)=>{
    
    const order= await Order.find({user:req.user.id})
    
    if (!order){
        res.status(404).json({
            success:false,
            Message:`user not login:`
        })
    }
    
    res.status(200).json({
        success:true,
        order
    })
}
//get all arder
exports.getAllOrder=async(req,res,next)=>{
    
    const order= await Order.find()
    let gettotal=0
    order.forEach(order=>{
        gettotal+=order.TotlePrice;
    })

    
    res.status(200).json({
        success:true,
        order,
        gettotal
    })
}

//update order status
exports.UpdateOrder=async(req,res,next)=>{
    
    const order= await Order.findById(req.params.id).catch((err)=>{
        res.status(404).json({
            success:false,
            Message:`order not found:`
        })
    })
    

    if(order.orderStatus==="deliverd"){
        res.status(404).json({
            success:false,
            Message:"you have allready deliverd this product"
        })
    }
    order.orderItems.forEach(async(order)=>{
        await updateStock(order.product,order.quantity)
    })
    order.orderStatus=req.body.status;
    if(req.body.status==="deliverd"){
        order.deliverAt=Date.now()
    }
    await order.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
        order
    })
}
async function updateStock(id,quantity){
    const product=await Product.findById(id);
    product.Stock-=quantity
    await product.save({validateBeforeSave:false})
}
//delete order
exports.Delete_Order=async(req,res,next)=>{
    
    const order= await Order.findById(req.params.id)
    await order.remove()
        
    if (!order){
        res.status(404).json({
            success:false,
            Message:`order not found:`
        })
    }
    res.status(200).json({
        success:true,
        
    })
}