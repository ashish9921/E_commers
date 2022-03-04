import React, { Fragment,useEffect } from 'react'
import { CgMouse } from 'react-icons/all'
import "./Home.css"
import Product from "./ProductCard.js"
import MetaData from '../layout/MetaData'
import {ClearErrors, getProduc} from '../../action/ProductAction.js'
import {useSelector, useDispatch} from "react-redux"
import Loader from '../layout/loader/Loader'
import { useAlert } from 'react-alert'

const Home = () => {
    const alert=useAlert()
    const dispatch=useDispatch();
    
    const {loading,error,products}=useSelector((state)=>state.products)
    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(ClearErrors)
        }
        dispatch(getProduc()) 
    },[dispatch,error,alert])
    return (
        <Fragment>
            {loading ? <Loader />:     <Fragment>
            
        <MetaData title="Mega PIZZAs  "/>
        <div className='banner'> 
            <p>Welcome to Pizza Shop</p>
            <h1>FIND AMAZING PIZZA BELOW </h1>
            <a href='#container'>
            <button>
                Scroll<CgMouse />
            </button>
        </a>
        </div>
        <h2 className='homeHeading'>Feature Product</h2>
        <div className='container' id="container">
        {products && products.map((product)=>   
            <Product product={product} />
        )}
        </div>
    </Fragment>}
        </Fragment>
    )
}

export default Home
