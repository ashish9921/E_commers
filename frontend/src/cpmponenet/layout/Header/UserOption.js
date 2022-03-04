import React, { Fragment, useState } from 'react'
import "./Header.css"
import {SpeedDial,SpeedDialAction} from "@material-ui/lab"
import {Dashboard,Person,ExitToApp,ListAlt,ShoppingCart} from "@material-ui/icons"
import { logout } from '../../../action/userAction'
import {useDispatch, useSelector} from 'react-redux'

import { useNavigate } from 'react-router-dom'
import {useAlert} from 'react-alert'
import { Backdrop } from '@material-ui/core'
function UserOption() {
    const history=useNavigate()
    const alert=useAlert()
    const {user}=useSelector(state=>state.user)
    const {cartitems}=useSelector(state=>state.cart)
    const dispatch = useDispatch()
    const [open, setopen] = useState(false)
    const option=[
        {icon:<ListAlt/>,name:"orders",func:orders},
        
        {icon:<Person style={{color:"green"}}/>,name:"profile",func:account},
        {icon:<ShoppingCart style={{color:cartitems.length>0? 'tomato':"unset"}}/>,name:`cart (${cartitems.length})`,func:Cart},
        {icon:<ExitToApp style={{color:"tomato"}}/>,name:"Logout",func:logoutUser},
    ]

    
    if (user.roll==="admin"){
        option.unshift({icon:<Dashboard style={{color:"blue"}}/>,name:"Dashboard",func:dashboard}
        )
    }
    
    function dashboard(){
        history("/dashbord")
    }
    function orders(){
        history("/orders")
    }
    function account(){
        history("/account")
    }
    function logoutUser(){
        dispatch(logout())
        alert.success("Logout Success")
    }
    function Cart(){
        history("/cart")
    }

    return (
        <Fragment>
            <div className='SpeedDial'>
            <Backdrop open={open} />
            <SpeedDial
            
            ariaLabel="SpeedDial tooltip example"
            onClose={()=>setopen(false)}
            onOpen={()=>setopen(true)}
            open={open}
            direction="down"
            sx={{ position: 'absolute', top: 16, right: 16 }}
            icon={<img 
            className='speedDialIcon'
            src={user.avatar.url ? user.avatar.url:"/Profile.png"}
            alt='Profile'
            
            />}
            >
                {option.map((item)=>(
                    <SpeedDialAction key={ item.name}icon={item.icon} tooltipTitle={item.name} tooltipOpen={window.innerWidth<=600?true:false}  onClick={item.func}/>        
                    ))}
            
            </SpeedDial>
            </div>
        </Fragment>
    )
}

export default UserOption
