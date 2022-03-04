import './App.css';
import  Header  from './cpmponenet/layout/Header/Header.js'
import Footer from './cpmponenet/layout/Footer/Footer.js'
import {Routes,Route} from "react-router-dom";
import WebFont from 'webfontloader';
import React from 'react';
import Home from "./cpmponenet/Home/Home.js";
import ProductDetail from "./cpmponenet/Product/ProductDetail.js"
import Products from './cpmponenet/Product/Products.js'
import Search from './cpmponenet/Product/Search.js'
import LoginSingup from './cpmponenet/User/LoginSingup';
import store from "./store"
import { loadUser } from './action/userAction';
import UserOption from './cpmponenet/layout/Header/UserOption.js'
import { useSelector } from 'react-redux';
import Profile from './cpmponenet/User/Profile.js'
import ProtectedR from './cpmponenet/Route/ProtectedR';
import UpdatePasswordCM from "./cpmponenet/User/UpdatePasswordCM.js"
import ForgotPassword from "./cpmponenet/User/ForgotPassword.js"
import ResetPassword from "./cpmponenet/User/ResetPassword.js"
import  UpdateUserProfile from './cpmponenet/User/UpdateUserProfile.js';
import Cart from './cpmponenet/Cart/Cart.js'
import Shiping from "./cpmponenet/Cart/Shping.js"
import ConformOrder from "./cpmponenet/Cart/ConformOrder.js"
function App() {
  const {isAuthenticated,user} =useSelector(state=>state.user)
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
    store.dispatch(loadUser())
  },[])
  
    return (
    <>
    <Header />  
    
    
    {isAuthenticated &&<UserOption user={user} />}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:keyword" element={<Products />} />
      <Route path="/search" element={<Search />} />
      <Route path="/account" element={<ProtectedR ><Profile /></ProtectedR>} />
      <Route path="/me/update" element={<ProtectedR ><UpdateUserProfile /></ProtectedR>} />
      <Route path="/login" element={<LoginSingup />} />
      <Route path="/password/update" element={<UpdatePasswordCM />} />
      <Route path="/password/forgot" element={<ForgotPassword />} />
      <Route path="/password/reset/:token" element={<ResetPassword />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shipping" element={<ProtectedR ><Shiping /></ProtectedR>} />
      <Route path="/order/confirm" element={<ConformOrder />} />

      

      
      

    </Routes>
    
      <Footer />
      </>

    );

}

export default App;
