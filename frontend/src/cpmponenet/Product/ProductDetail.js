import React, { Fragment,useEffect } from 'react'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./ProductDetail.css"
import { useSelector,useDispatch } from 'react-redux' 
import { ClearErrors, getProductDetail } from '../../action/ProductAction'
import ReviewCard from './ReviewCard.js'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import Loader from '../layout/loader/Loader.js' 
import{useAlert} from 'react-alert'
import MetaData from '../layout/MetaData'
import { useState } from 'react';
import {addItemToCart} from "../../action/cartAction.js"

const ProductDetail = () => {
    
    const match =useParams()   
    const dispatch=useDispatch();
    const alert =useAlert();

    const {product,loading,error}=useSelector((state)=>state.productDetail)
    const [quantity, setquantity] = useState(1);

    const increaseQuantity =()=>{
    
        const qte=quantity+1
        if(product.Stock>=qte){
        setquantity(qte)
        }
    }
    const decriseQuantity =()=>{
        const qtt=quantity-1;
        if(0<qtt){
        setquantity(qtt)
        }
    }

    const addToCartHandler = () =>{
        dispatch(addItemToCart(match.id,quantity))
        alert.success("Item Added to Cart")
    }
    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(ClearErrors)
        }
        dispatch(getProductDetail(match.id))
    }, [dispatch,match.id,error,alert])
    const options={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth<600 ? 20:25,
        value:product.ratings,
        isHalf:true,
    }
    return (
    <Fragment>
        {loading ? <Loader />:
        <Fragment>
            <MetaData title={`${product.name} --MEGA ECOMMERS`} />
        <div className='ProductDetails'>
            <div>
                <Carousel autoFocus={true}>
                {product.Images &&
                  product.Images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
                </Carousel>  
              
        </div>

            <div>
            <div className='detailsBlock-1'>
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
            </div>
            <div className='detailsBlock-2'>
                    <ReactStars {...options} />
                    <span>{product.numOfReviews} Reviews</span>
            </div>
            <div className='detailsBlock-3'>
                <h2>{product.price}</h2>
            <div className='detailsBlock-3-1'>
                <div className='detailsBlock-3-1-1'>
                    <button onClick={decriseQuantity}>-</button>
                    <input value={quantity} readOnly type="number" />
                    <button onClick={increaseQuantity}>+</button>

                </div>{" "}
                <button onClick={addToCartHandler}>Add To Cart</button>
            </div> 
            <p>
                Status:{" "}
                <b className={product.Stock<1?"redColor" :"greenColor"}>
                    {product.Stock<1? "OutOfStock":"InStock"}
                </b>
            </p>
            </div>

            <div className='detailsBlock-4'>
                Description : <p>{product.description}</p>
            </div>
            <div>
            <button className='submitReview'>Submit Review</button>
            </div>
            </div>
        </div>
        <h3 className='reviewsHeading'>Reviews</h3>
        {product.reviews && product.reviews[0] ? (
            <div className='reviews'>
               {product.reviews &&
               product.reviews.map((review)=> <ReviewCard review={review} />)} 
            </div>
        ):(
            <p className='noReviews'>No Reviews Yet</p>
        )}

    </Fragment>
        }
    </Fragment>
    )
}

export default ProductDetail
