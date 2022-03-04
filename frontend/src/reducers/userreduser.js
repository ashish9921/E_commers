import { LOGIN_REQUEST,LOGIN_FAIL,LOGIN_SUCCESS,CLEAR_ERROR,REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAIL ,
    LOAD_REQUEST,LOAD_SUCCESS,LOAD_FAIL,LOGOUT_SUCCESS,LOGOUT_FAIL,
    UPDATE_REQUEST,UPDATE_SUCCESS,UPDATE_RESET,UPDATE_FAIL,
    UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_FAIL,UPDATE_PASSWORD_RESET,UPDATE_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_FAIL,RESET_PASSWORD_REQUEST,RESET_PASSWORD_SUCCESS} from "../constant/userConstant"

export const userreduser =(state={user: [] },action)=>{
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:                              
        case LOAD_REQUEST:                              
            return {
                loading:true,
                isAuthenticated:false
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_SUCCESS :   
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload
            }
        case LOGIN_FAIL:
            case REGISTER_FAIL:
    
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload
            }   
        case LOAD_FAIL:
            return{
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload
            }     
        case CLEAR_ERROR:
            return{
                ...state,
                error: null
            }   
        case LOGOUT_SUCCESS:
            return{
                loading:false,
                user:null,
                isAuthenticated:false,
            }          
            case LOGOUT_FAIL:
                return{
                    ...state,
                    loading:false,
                    user:action.payload
                }    
        default:
            return state;

    }
}


export const Profilereduser =(state={},action)=>{
    switch (action.type) {
        case UPDATE_REQUEST:                 
        case UPDATE_PASSWORD_REQUEST:                 
            return {
                ...state,
                loading:true
            };
        case UPDATE_SUCCESS: 
        case UPDATE_PASSWORD_SUCCESS: 
            return{
                ...state,
                loading:false,
                isUpdated:action.payload
            }
        case UPDATE_FAIL:
        case UPDATE_PASSWORD_FAIL:
                return{
                ...state,
                loading:false,
                error:action.payload
            }
        case UPDATE_RESET:
        case UPDATE_PASSWORD_RESET:
            return{
                ...state,
                isUpdated:false,
                
            }       
            
        case CLEAR_ERROR:
            return{
                ...state,
                error: null
            }     
   
        default:
            return state;

    }
}



export const ForgotPasswordreduser =(state={},action)=>{
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:           
        case FORGOT_PASSWORD_REQUEST:                 
            return {
                ...state,
                loading:true,
                error:null
            };

        case FORGOT_PASSWORD_SUCCESS: 
            return{
                ...state,
                loading:false,
                message:action.payload
            }

        case RESET_PASSWORD_SUCCESS: 
            return{
                ...state,
                loading:false,
                success:action.payload
            }    
            
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
                return{
                ...state,
                loading:false,
                error:action.payload
            }
             
            
        case CLEAR_ERROR:
            return{
                ...state,
                error: null
            }     
   
        default:
            return state;

    }
}