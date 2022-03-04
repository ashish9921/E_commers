import React, { Fragment ,useState,useEffect} from 'react'
import "./ResetPass.css"
import Loader from "../layout/loader/Loader.js"
import MetaData from '../layout/MetaData'
import {ClearErrors,reset} from '../../action/userAction.js'
import {useDispatch ,useSelector} from "react-redux"
import {useAlert} from "react-alert" 
import {LockOpen,Lock} from "@material-ui/icons"
import { useParams ,useNavigate} from "react-router-dom";


const ResetPassword = () => {
    const match=useParams()
    const dispatch =useDispatch()
    const alert=useAlert()
    const history=useNavigate()
    
    const {error,success,loading} = useSelector(state=>state.forgotPassword)

    const [newPassword, setnewPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    
    const updateSubmit =(e)=>{
        e.preventDefault();
        const myform =new FormData();
        
        myform.set("password",newPassword);
        myform.set("confirmPassword",confirmPassword);
        dispatch(reset(match.token,myform))
        
    
    }

    useEffect(() => {
           if (error){
                alert.error(error);
                dispatch(ClearErrors())
           }
        if(success){
            alert.success("password Update Successfully")
            history("/login")
           }
    }, [dispatch,error,alert,history,success])

    return <Fragment>
        {loading?<Loader /> :<Fragment>
        <MetaData title="RESET PROFILE "/>
    <div className='resetPasswordContainer'>
    <div className='resetPasswordBox'>
        <div className='resetPasswordHeading'>
        <h2>RESET PROFILE</h2>
        </div>
        
    <form 
                 className='resetPasswordForm'
                
                 onSubmit={updateSubmit}
                >
                     
                    <div className='loginPassword'> 
                        <LockOpen />
                        <input
                        type="password"
                        placeholder='new password'
                        required
                        value={newPassword}
                        onChange={(e)=> setnewPassword(e.target.value)}
                        />
                    </div>
                    <div className='loginPassword'>
                        <Lock />
                        <input
                        type="password"
                        placeholder='conform password'
                        required
                        value={confirmPassword}
                        onChange={(e)=> setconfirmPassword(e.target.value)}
                        />
                    </div>
                <input type="submit" value="update" className="resetPasswordBtn" />
                </form>
    </div>
    </div>
    
    </Fragment>
}
    </Fragment>  

};

export default ResetPassword;
