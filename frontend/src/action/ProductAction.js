import axios from "axios";
import {
    ALLL_PRODUCT_REQUEST,
    ALLL_PRODUCT_SUCCESS,
    ALLL_PRODUCT_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    CLEAR_ERRORS

} from "../constant/ProductConstant.js"


export const getProduc=(keyword="",currentPage=1,price=[0,25000],category,all,rating=0)=> async (dispatch)=>{
    try {
        dispatch({type:ALLL_PRODUCT_REQUEST})
        let link= `/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`
        if(category){
            link= `/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`
        }
        
        const {data}=await axios.get(link).catch((error)=>{
            dispatch({
                type:ALLL_PRODUCT_FAIL,
                payload: error.response.data.message,
            })
        })
            dispatch({
                type:ALLL_PRODUCT_SUCCESS,
                payload:data
            })
    } catch (error) {
    console.log(error)
    }
}


export const getProductDetail=(id)=> async (dispatch)=>{
    
    try {
        dispatch({type:PRODUCT_DETAIL_REQUEST})
        const {data}=await axios.get(`/api/v1/product/${id}`).catch((error)=>{
            dispatch({
                type:PRODUCT_DETAIL_FAIL,
                payload: error.response.data.message,
            })
        })
            dispatch({
                type:PRODUCT_DETAIL_SUCCESS,
                payload:data.product
            })
    } catch (error) {
    console.log(error)
    }
}
//clearing errors
export const ClearErrors=()=> async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}