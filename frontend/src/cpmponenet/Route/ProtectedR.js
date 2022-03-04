import React  from 'react'
import { useSelector } from 'react-redux'
import {Navigate} from 'react-router-dom'

const ProtectedR = ({children}) => {
    const  {loading,isAuthenticated}= useSelector(state => state.user)
    
    if(!loading){
    return isAuthenticated ? children : <Navigate to="/login" />
    }
}

export default ProtectedR
