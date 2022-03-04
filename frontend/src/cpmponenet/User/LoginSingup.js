import React, { Fragment,useRef ,useState,useEffect} from 'react'
import "./LOginSinguo.css"
import Loader from "../layout/loader/Loader.js"
import { Link } from 'react-router-dom'

import {EmailOutlined,Face,LockOpen, MailOutline} from "@material-ui/icons"
import {login,ClearErrors,register} from '../../action/userAction.js'
import {useDispatch ,useSelector} from "react-redux"
import {useAlert} from "react-alert" 
import { useNavigate,useLocation} from "react-router-dom";
const LoginSingup = () => {
    const dispatch =useDispatch()
    const alert=useAlert()
    const history=useNavigate()
    const location=useLocation()
    const {error,loading,isAuthenticated} = useSelector(state=>state.user)

    const logintab=useRef(null)
    const registerTab=useRef(null)
    const switcherTabs=useRef(null)
    const [loginEmail, setloginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
    })
    const {name,email,password} =user;
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState('/Profile.png');
    const loginSubmit=(e)=>{
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword))
    }
    const resisterSubmit =(e)=>{
        e.preventDefault();
        const myform =new FormData();
        myform.set("name",name);
        myform.set("email",email);
        myform.set("password",password);
        myform.set("avatar",avatar);
        dispatch(register(myform))

    }
    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          };
    
          reader.readAsDataURL(e.target.files[0]);
        } else {
          setUser({ ...user, [e.target.name]: e.target.value });
        }
      };
      const redirect=location.search?location.search.split('=')[1]:'/account'
      
    useEffect(() => {
           if (error){
                alert.error(error);
                dispatch(ClearErrors())
           }
           if(isAuthenticated){
               history(redirect)
           }
        
    }, [dispatch,error,alert,history,isAuthenticated,redirect])
    const switcherTab=(e,tab)=>{
        if(tab==="login"){
            switcherTabs.current.classList.add("shiftToNeutral")
            switcherTabs.current.classList.remove("shiftToRight")
            registerTab.current.classList.remove("shiftToNeutralForm")
            logintab.current.classList.remove("shiftToLeft")

        }
        if(tab==="register"){
            switcherTabs.current.classList.add("shiftToRight")
            switcherTabs.current.classList.remove("shiftToNeutral")
            registerTab.current.classList.add("shiftToNeutralForm")
            logintab.current.classList.add("shiftToLeft");


        }

    }
    return (
        <Fragment>
            {loading?<Loader />:  <Fragment>
            <div className='LoginSignUpContainer'>
            <div className='LoginSignUpBox'>
                <div>
                    <div className='login_signUp_toggle'>
                        <p onClick={(e)=>switcherTab(e,"login")}>Login</p>
                        <p onClick={(e)=>switcherTab(e,"register")}>Register</p>
                    </div>
                    <button ref={switcherTabs}></button>

                </div>
                <form className='loginForm' ref={logintab} onSubmit={loginSubmit}>
                    <div className='loginEmail'>
                        <EmailOutlined />
                        <input
                        type="email"
                        placeholder='Email'
                        required
                        value={loginEmail}
                        onChange={(e)=> setloginEmail(e.target.value)}
                        />
                    </div>
                    <div className='loginPassword'>
                        <LockOpen />
                        <input
                        type="password"
                        placeholder='password'
                        required
                        value={loginPassword}
                        onChange={(e)=> setLoginPassword(e.target.value)}
                        />
                    </div>
                    <Link to="/password/forgot">Forgot password ?</Link>
                    <input type='submit' value='Login' className='loginBtn' />
                </form>
                <form 
                 className='signUpForm'
                 ref={registerTab}
                 encType='multipart/form-data'
                 onSubmit={resisterSubmit}
                >
                    <div className='signUpName'>
                    <Face />
                    <input type='text' placeholder='Name' required name='name' onChange={registerDataChange} />
                    </div>
                    <div className="signUpEmail">
                  <MailOutline />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                    <LockOpen />
                    <input type='password' placeholder='Password' required name='password' onChange={registerDataChange} />
                    </div>
                    <div id='registerImage'>
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input type='file' name='avatar' accept='image/*' onChange={registerDataChange} />
                    </div>
                    <input type="submit" value="Register" className="signUpBtn" />


                </form>
            </div>
            </div>
        </Fragment>
}
        </Fragment>
          )
}

export default LoginSingup
