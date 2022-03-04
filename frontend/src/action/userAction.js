import { LOGIN_FAIL,LOGIN_SUCCESS,CLEAR_ERROR,REGISTER_SUCCESS,REGISTER_FAIL,LOAD_REQUEST,LOAD_SUCCESS,LOAD_FAIL,
    LOGOUT_SUCCESS,LOGOUT_FAIL ,
    UPDATE_REQUEST,UPDATE_SUCCESS,UPDATE_FAIL,
    UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_FAIL,UPDATE_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_FAIL,RESET_PASSWORD_REQUEST,RESET_PASSWORD_SUCCESS} from "../constant/userConstant"

import axios from "axios"


//login👧👵👵
export const login =(email,password)=> async (dispatch)=>{
    try {
        dispatch({type:LOGIN_SUCCESS,})
        const config = {headers:{"Content-Type": "application/json"}}
        const {data} =await axios.post(
            `/api/v1/login`,
            {email,password},
            config
        ).catch((error)=>{
            dispatch({type:LOGIN_FAIL,payload:error.response.data.message})
        })
        dispatch({type:LOGIN_SUCCESS,payload:data.user})
    } catch (error) {
       
        console.log(`${error} this `)
    }
}
//register
export const register =(userData)=> async (dispatch)=>{
    try {
        dispatch({type:REGISTER_SUCCESS,})
        const config = {headers:{"Content-Type": "multipart/json"}}
        const {data} =await axios.post(
            `/api/v1/user`,
            userData,
            config
        ).catch((error)=>{
            dispatch({type:REGISTER_FAIL,payload:error.response.data.message})
        })
        dispatch({type:REGISTER_SUCCESS,payload:data.user})
    } catch (error) {
        console.log(`${error} 2`)

    }
}
//load
export const loadUser =()=> async (dispatch)=>{
    try {
        dispatch({type:LOAD_REQUEST})
    
        const {data} =await axios.get(
            `/api/v1/me`
        ).catch((error)=>{
            dispatch({type:LOAD_FAIL,payload:error.response.data.message})
        })
        dispatch({type:LOAD_SUCCESS,payload:data.user})
    } catch (error) {
       
        console.log(`${error} 3`)   
    }
}
//logoutUser
export const logout =()=> async (dispatch)=>{
    try {
        
    
        await axios.get(
            `/api/v1/logout`,
        ).catch((error)=>{
            dispatch({type:LOGOUT_FAIL,payload:error.response.data.message})
        })
        dispatch({type:LOGOUT_SUCCESS})
    } catch (error) {
       
        console.log(`${error} 4`)
    }
}
//update profile😂❤
export const UpdateProfile =(userData)=> async (dispatch)=>{
    try {
        dispatch({type:UPDATE_REQUEST})
        const config = {headers:{"Content-Type": "multipart/form.data"}}
        const {data} =await axios.put(
            `/api/v1/me/update`,
            userData,
            config
        )
        dispatch({type:UPDATE_SUCCESS,payload:data.success})

    } catch (error) {
        dispatch({type:UPDATE_FAIL,payload:error.response.data.message})

        console.log(`${error} 2`)

    }
}
//clearing errors

//update password
export const UpdatePassword =(passwords)=> async (dispatch)=>{
    try {
        dispatch({type:UPDATE_PASSWORD_REQUEST})
        const config = {headers:{ "Content-Type": "application/json"}}
        const {data} =await axios.put(
            `/api/v1/password/update`,
            passwords,
            config
        )
        dispatch({type:UPDATE_PASSWORD_SUCCESS,payload:data.success})
    } catch (error) {
        dispatch({type:UPDATE_PASSWORD_FAIL,payload:error.response.data.message})

        console.log(`${error} 2`)

    }
}
//forgot Password 👼🏾👼🏾👼🏾
export const forgot=(email)=> async (dispatch)=>{
    try {
        dispatch({type:FORGOT_PASSWORD_REQUEST,})
        const config = {headers:{"Content-Type": "application/json"}}
        const {data} =await axios.post(
            `/api/v1/password/forgot`,
            email,
            config
        )   
        dispatch({type:FORGOT_PASSWORD_SUCCESS,payload:data.message})
    } catch (error) {

        dispatch({type:FORGOT_PASSWORD_FAIL,payload:error.response.data.message})

       
        console.log(`${error} this `)
    }
}

//reset Password 👼🏻👼🏻👼🏻😤
export const reset=(token,password)=> async (dispatch)=>{
    try {
        dispatch({type:RESET_PASSWORD_REQUEST,})
        const config = {headers:{"Content-Type": "application/json"}}
        const {data} =await axios.put(
            `/api/v1/password/reset/${token}`,
            password,
            config
        )
        
        dispatch({type:RESET_PASSWORD_SUCCESS,payload:data.success})
    } catch (error) {
        dispatch({type:RESET_PASSWORD_FAIL,payload:error.response.data.message})

       
        console.log(`${error} this `)
    }
}

export const ClearErrors=()=> async(dispatch)=>{
    dispatch({type:CLEAR_ERROR})
}