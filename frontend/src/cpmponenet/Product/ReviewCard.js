import React from 'react'
import ReactStars from 'react-rating-stars-component'
import profilePng from "../../images/Profile.png"
const reviewCard=({review})=>{
    const options={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth<600 ? 20:25,
        value:review.reting,
        isHalf:true,
    }
    return (
        <div className='reviewCard'>
            <img src={profilePng} alt="User" />
            <p>{review.name}</p>
            <div className='reviewCardComment'>
            <p>{review.comment}</p>
            </div>
            <ReactStars {...options}/>

        </div>
    )
}

export default reviewCard
