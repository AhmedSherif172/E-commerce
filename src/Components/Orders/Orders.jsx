import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'

function Orders() {
  const [orders,setOrders]=useState([])

  async function getAllOrders(id){
    const {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/orders/user/"+id)
    setOrders(data);
    console.log(data);
  }
  useEffect(()=>{
    const {id}= jwtDecode(localStorage.getItem("token"))
    console.log(id); 

    getAllOrders(id)
  },[])


  return (
    <>
      <h1>Your Orders:</h1>

      {orders.map((order)=>{
        return <div key={order.id} className="row">
          <div className='order shadow rounded p-4 my-5 '>
            <div className="d-flex align-items-center ">
              <h2 className='fw-bolder h1 '>#{order.id}</h2>
              <h4 className='fw-bold text-primary mx-4 '>Processing</h4>
            </div>
            <p>You have ordered {order.cartItems.length}</p>
            <div className="d-felx">
              {order.cartItems.map((item)=>{
                return <img key={item._id} src={item.product.imageCover} className='mx-2 border border-1 rounded-2 ' style={{width:150}} alt="" />
              })}
            </div>
            <hr />
            <p><strong>Total amount: </strong>{order.totalOrderPrice} EGP</p>
          </div>
        </div>
      })}
    
    </>
  )
}

export default Orders