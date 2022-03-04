import React, { Fragment ,useState,useEffect} from 'react'
import "./Update.css"
import Loader from "../layout/loader/Loader.js"
import MetaData from '../layout/MetaData'
import {Face, MailOutline} from "@material-ui/icons"
import {ClearErrors,loadUser,UpdateProfile} from '../../action/userAction.js'
import {useDispatch ,useSelector} from "react-redux"
import {useAlert} from "react-alert" 
import { useNavigate} from "react-router-dom";
import { UPDATE_RESET } from '../../constant/userConstant'
const UpdateUserProfile = () => {
    
    const dispatch =useDispatch()
    const alert=useAlert()
    const history=useNavigate()
    const {user} = useSelector(state=>state.user)
    const {error,isUpdated,loading} = useSelector(state=>state.profile)

    const [name, setName] = useState()
    const [email, setemail] = useState()

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    
    const updateSubmit =(e)=>{
        e.preventDefault();
        const myform =new FormData();
        myform.set("name",name);
        myform.set("email",email);
        myform.set("avatar",avatar);
        dispatch(UpdateProfile(myform))
    
    }
    const updateProfileDataChange = (e) => {
        
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          };
    
          reader.readAsDataURL(e.target.files[0]);
        
      };
    useEffect(() => {

        if(user){
            setName(user.name)
            setemail(user.email)
            setAvatar(user.avatar.url)
        }
           if (error){
                alert.error(error);
                dispatch(ClearErrors())
           }
        if(isUpdated){
            alert.success("Profile Update Successfully")
            dispatch(loadUser());
            history("/account")
            dispatch({
               type:UPDATE_RESET
            })
           }
    }, [dispatch,error,alert,user,history,isUpdated])


    return <Fragment>
        {loading?<Loader /> :<Fragment>
        <MetaData title="Update Profile "/>
    <div className='updateProfileContainer'>
    <div className='updateProfileBox'>
        <div className='updateProfileHeading'>
        <h2>UPDATE PROFILE</h2>

        </div>
    <form 
                 className='updateProfileForm'
                 encType='multipart/form.data'
                 onSubmit={updateSubmit}
                >
                    <div className='updateProfileName'>
                    <Face />
                    <input type='text' placeholder='Name' required name='name' onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className="updateProfileEmail">
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
                    <div id='updateProfileImage'>
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input type='file' name='avatar' accept='image/*' onChange={updateProfileDataChange} />
                    </div>
                    <input type="submit" value="updateProfile" className="updateProfileBtn" />
                </form>
    </div>
    </div>
    
    </Fragment>
}
    </Fragment>  
}

export default UpdateUserProfile
