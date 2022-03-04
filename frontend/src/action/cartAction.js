import { ADD_TO_CART, REMOVE_TO_CART, SAVE_SHIPPING_INFO } from "../constant/cartConstatnt";
import axios from "axios"

//add iem to cart 😪😥🥱
export const addItemToCart =(id,quantity)=> async (dispatch,getState)=>{
   
        const {data} =await axios.get(
            `/api/v1/product/${id}`,
        )
            
        
        dispatch({type:ADD_TO_CART,payload:{
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.Images[0].url,
            Stock:data.product.Stock,
            quantity,

        }})


        localStorage.setItem("cartitems",JSON.stringify(getState().cart.cartitems))
}
export const removeFromCart = (id) => async (dispatch,getState) =>{
    dispatch({
        type:REMOVE_TO_CART,
        payload:id,

    })
    localStorage.setItem("cartitems",JSON.stringify(getState().cart.cartitems))

}
//save shiping info

export const shipinginfodata=(data)=>async(dispatch)=>{
    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data,
    })
    localStorage.setItem("shippingInfo",JSON.stringify(data))

}