import {
    ALLL_PRODUCT_REQUEST,
    ALLL_PRODUCT_SUCCESS,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    ALLL_PRODUCT_FAIL,
    CLEAR_ERRORS

} from "../constant/ProductConstant.js"

export const productReducer =(state={products: [] },action)=>{
    switch (action.type) {
        case ALLL_PRODUCT_REQUEST:
            
            return{
                loading:true,
                products:[]
            }
        case ALLL_PRODUCT_SUCCESS:
            
            return{
                loading:false,
                products:action.payload.products,
                productsCount:action.payload.productCount,
                resultPerPage:action.payload.resultPerPage,
                filterdProductCount:action.payload.filterdProductCount
            }
     
        case ALLL_PRODUCT_FAIL:
            
            return{
                loaing:false,
                error:action.payload
            }   
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }         
        default:
            return state;
    }
}

export const productDetailReducer =(state={product: {} },action)=>{
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            
            return{
                loading:true,
                ...state
            }
        case PRODUCT_DETAIL_SUCCESS:
            
            return{
                loading:false,
                product:action.payload,
                
     
            }
     
        case PRODUCT_DETAIL_FAIL:
            
            return{
                loaing:false,
                error:action.payload
            }   
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }         
        default:
            return state;
    }
}