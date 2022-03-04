import React, { Fragment ,useState,useEffect} from 'react'
import "./forgot.css"
import Loader from "../layout/loader/Loader.js"
import MetaData from '../layout/MetaData'
import { MailOutline} from "@material-ui/icons"
import {ClearErrors,forgot} from '../../action/userAction.js'
import {useDispatch ,useSelector} from "react-redux"
import {useAlert} from "react-alert" 
import { useNavigate} from "react-router-dom";

const ForgotPassword = () => { 
       
    const dispatch =useDispatch()
    const alert=useAlert()
    const history=useNavigate()
    
    const {error,message,loading} = useSelector(state=>state.forgotPassword)
    
    
    const [email, setemail] = useState("")
    
    const updateSubmit =(e)=>{
        e.preventDefault();
        const myform =new FormData();

        myform.set("email",email);
        
        dispatch(forgot(myform))
        console.log(myform)
    }
    useEffect(() => {

   
           if (error){
                alert.error(error);
                dispatch(ClearErrors())
           }
        if(message){
            alert.success(message)
        
           }
    }, [dispatch,error,alert,history,message])

  return <Fragment>
  {loading?<Loader /> :<Fragment>
  <MetaData title="FORGOT PASSWORD "/>
<div className='forgotPasswordContainer'>
<div className='forgotPasswordBox'>
  <div className='forgotPasswordHeading'>
  <h2>FORGOT PASSWORD</h2>

  </div>
<form 
           className='forgotPasswordForm'
           
           onSubmit={updateSubmit}
          >
              <div className="forgotPasswordEmail">
            <MailOutline />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e)=>setemail(e.target.value)}
            />
          </div>                
             
              <input type="submit" value="send" className="forgotPasswordBtn" />
          </form>
</div>
</div>

</Fragment>
}
</Fragment>  
};

export default ForgotPassword;
