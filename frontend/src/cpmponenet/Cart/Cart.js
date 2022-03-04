import React, { Fragment } from 'react';
import "./Cart.css"
import {useSelector,useDispatch} from 'react-redux'
import CartItemCard from "./CartItemCard.js"
import { addItemToCart, removeFromCart } from '../../action/cartAction';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import {RemoveShoppingCart} from '@material-ui/icons'
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const history=useNavigate()
  const dispatch=useDispatch()
  const {cartitems}=useSelector((state)=>state.cart)
  const {user}=useSelector((state)=>state.user)
  const increaseQuantity =(id,quantity,stock)=>{
    const newqty =quantity+1
    if(stock<=quantity){
      return;
    }
    dispatch(addItemToCart(id,newqty))
  }
  const decreasQuantity =(id,quantity)=>{
    const newqty =quantity-1
    if(1>=quantity){
      return;
    }
    dispatch(addItemToCart(id,newqty))
  }
  const deleteItem=(id)=>{
    dispatch(removeFromCart(id))
  }
  const checkoutHandeler=()=>{
    
    history(`/shipping`)

  }
  return (
    <Fragment>
      {cartitems.length=== 0 || user===null? (
        <div className='emptyCart'>
          <RemoveShoppingCart />
          <Typography>No Product in your cart</Typography>
          <Link to="/products ">view Product</Link>
        </div>
      ): <Fragment>
    <div className='cartPage'>
      <div className='cartHeader'>
        <p>Product</p>
        <p>Quntity</p>
        <p>Subtotal</p>
      </div>

      {cartitems &&
                  cartitems.map((item, i) => (
                    <div className='cartContainer' key={item.product}>
        
                    <CartItemCard item={item} deleteItem={deleteItem} />
                    <div className='cartInput'>
                      <button onClick={()=>decreasQuantity(item.product,item.quantity)}>-</button>
                      <input type="number"  readOnly value={item.quantity} /> 
                      <button onClick={()=>increaseQuantity(item.product,item.quantity,item.Stock)}>+</button>
                    </div>
                    <p className='cartSubtotal'>{`₹${item.price*item.quantity}`}</p>
                </div>
                  ))}
     
      <div className='cartGrossProfit'>
        <div></div>
        <div className='cartGrossProfitBox'>
          <p>Gross Total</p>
          <p>{`₹${cartitems.reduce(
            (acc,item)=> acc + item.quantity*item.price,0
          )}`}</p>
        </div>
        <div className='checkOutBtn'>
          <button onClick={checkoutHandeler}>Check Out</button>
        </div>
      </div>
    </div>
  </Fragment> }     
    </Fragment>
  )
};

export default Cart;
