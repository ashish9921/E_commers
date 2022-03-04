import React, { Fragment ,useEffect,useState} from 'react'
import './Products.css'
import {ClearErrors, getProduc} from '../../action/ProductAction.js'
import {useSelector, useDispatch} from "react-redux"
import ProductCard from "./../Home/ProductCard.js"
import { useParams } from 'react-router-dom'

import Loader from '../layout/loader/Loader'
import Pagination from 'react-paginate'
import {Slider} from '@material-ui/core'
import {useAlert} from 'react-alert'
import MetaData from '../layout/MetaData'
import { Typography } from '@material-ui/core'
const categories=[
    "pants",
    "Shirts",
    "jakets",
    "hats",
    "guitars",
    "machin"
]
const allpro=[
    "All Products"
]
const Products = () => {

    const match=useParams()
    const dispatch=useDispatch();
    const alert=useAlert
    const [rating, setrating] = useState(0)
    const [category, setcategory] = useState("")
    const [all, setall] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setprice] = useState([0,25000])
    const {loading,error,products,productsCount,resultPerPage}=useSelector((state)=>state.products)
    const keyword =match.keyword
    console.log(keyword)
    const handlePageClick = (event) => {
    
        const newOffset = (event.selected);

        setCurrentPage(newOffset);
      };
      const priceHandler=(event,newPrice)=>{
          setprice(newPrice)

      }
    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(ClearErrors)
        }
        
        dispatch(getProduc(keyword,currentPage,price,category,all,rating)) 
    },[dispatch,error,keyword ,currentPage,price,category,all,rating,alert])
    
    

    return (
        <Fragment>
            {loading?<Loader />:
            <Fragment>
                <MetaData title="PRODUCT -- MEGA ECOMMRCE" />
            <h2 className='productsHeading'>Products</h2>    
            <div className='products'>
                {products &&
                  products.map((product)=>
                        <ProductCard key={product._id} product={product} />
                  )
                }
            </div>
            <div className='filterBox'>
                <Typography>Price</Typography>
                <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay='auto'
                aria-labelledby='range-slider'
                min={0}
                max={25000}

                 />
                <Typography>category</Typography>
            <ui className='categoryBox'>
                {
                    categories.map((category)=>(
                        <li className='category-link' key={category} onClick={()=>setcategory(category)}>
                            {category}
                        </li>
                    ))
                }
                {
                    allpro.map((all)=>(
                <li className='category-link' key={all} onClick={()=>setall(all)}  >
                    {all}
                    </li>
                    ))
                }
            </ui>
            <fieldset>
                <Typography>Rating Above</Typography>
                <Slider
                value={rating}
                onChange={(e,newRating)=>{
                    setrating(newRating)
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay='auto'
                min={0}
                max={5}
                />
            </fieldset>
            </div>
            
            {resultPerPage<productsCount &&(
                <div className='paginationBox'>
                <Pagination 
                
                 breakLabel="..."
                 previousLabel="prev"
                 nextLabel="next >"
                 pageCount={4}
                 initialPage={currentPage}
                 containerClassName='pagination'
                   onPageChange={handlePageClick}
                   pageClassName="page-item"
                   pageLinkClassName="page-link"
                   previousClassName='page-item'
                   previousLinkClassName='page-link'
                   nextClassName='page-item'
                   nextLinkClassName='page-link'
                   activeClassName="pageItemActive"
                   activeLinkClassName="pageLinkActive"
                />
            </div>
            )}
            </Fragment> }
        </Fragment>
    )
}

export default Products
