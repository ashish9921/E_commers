import {createStore,combineReducers,applyMiddleware } from "redux";

import thunk from "redux-thunk";

import {composeWithDevTools} from "redux-devtools-extension";
import { productReducer,productDetailReducer } from "./reducers/productReducer";
import { Profilereduser, userreduser ,ForgotPasswordreduser} from "./reducers/userreduser";
import {CartReducer} from "./reducers/CartReducer"

const reducer = combineReducers({
    products:productReducer,
    productDetail:productDetailReducer,
    user:userreduser,
    profile:Profilereduser,
    forgotPassword:ForgotPasswordreduser,
    cart:CartReducer
})
let initialState={
    cart:{
        cartitems:localStorage.getItem("cartitems")? JSON.parse(localStorage.getItem("cartitems")):[],
    }
};

const midleware=[thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...midleware))
    );
    
export default store;