import React, { Fragment ,useState,useEffect} from 'react'
import "./UpdatPassword.css"
import Loader from "../layout/loader/Loader.js"
import MetaData from '../layout/MetaData'
import {ClearErrors,UpdatePassword} from '../../action/userAction.js'
import {useDispatch ,useSelector} from "react-redux"
import {useAlert} from "react-alert" 
import {LockOpen,Lock,VpnKey} from "@material-ui/icons"

import { useNavigate} from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from '../../constant/userConstant'

const UpdatePasswordCM = () => {
    const dispatch =useDispatch()
    const alert=useAlert()
    const history=useNavigate()
    
    const {error,isUpdated,loading} = useSelector(state=>state.profile)

    const [oldPassword, setoldPassword] = useState("")
    const [newPassword, setnewPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    
    const updateSubmit =(e)=>{
        e.preventDefault();
        const myform =new FormData();
        myform.set("oldPassword",oldPassword);
        myform.set("newPassword",newPassword);
        myform.set("confirmPassword",confirmPassword);
        dispatch(UpdatePassword(myform))
    
    }

    useEffect(() => {
           if (error){
                alert.error(error);
                dispatch(ClearErrors())
           }
        if(isUpdated){
            alert.success("Profile Update Successfully")
            history("/account")
            dispatch({
               type:UPDATE_PASSWORD_RESET
            })
           }
    }, [dispatch,error,alert,history,isUpdated])

    return <Fragment>
        {loading?<Loader /> :<Fragment>
        <MetaData title="Change Password "/>
    <div className='updatePasswordContainer'>
    <div className='updatePasswordBox'>
        <div className='updatePasswordHeading'>
        <h2>UPDATE PROFILE</h2>
        </div>
        
    <form 
                 className='updatePasswordForm'
                 encType='multipart/form-data'
                 onSubmit={updateSubmit}
                >
                    
                               
                    <div className='loginPassword'>
                        <VpnKey />
                        <input
                        type="password"
                        placeholder='old password'
                        required
                        value={oldPassword}
                        onChange={(e)=> setoldPassword(e.target.value)}
                        />
                    </div>
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
                <input type="submit" value="changePassword" className="updatePasswordBtn" />
                </form>
    </div>
    </div>
    
    </Fragment>
}
    </Fragment>  

};

export default UpdatePasswordCM;
