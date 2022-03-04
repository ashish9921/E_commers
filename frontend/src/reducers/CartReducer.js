import { ADD_TO_CART ,REMOVE_TO_CART, SAVE_SHIPPING_INFO} from "../constant/cartConstatnt";



export const CartReducer = (state={shippingInfo:[],cartitems:[]},action )=>{

    switch (action.type) {
        case ADD_TO_CART:
            
            const item = action.payload
            const isItemexist = state.cartitems.find(
                (i)=>i.product ===item.product
            )
            if(isItemexist){
                return{
                ...state,
                cartitems:state.cartitems.map((i)=>
                i.product===isItemexist.product?item:i
                )
            }
            }
            else{
                return{
                    ...state,
                cartitems:[...state.cartitems,item]
                }
            }
        case REMOVE_TO_CART:
            return{
                ...state,
                cartitems:state.cartitems.filter((i)=>i.product !==action.payload)
            }    
        case SAVE_SHIPPING_INFO:
            return{
                ...state,
                shippingInfo:action.payload
            }
        default:
            return state
    }
} 