import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Product from '../Product/Product';

export default function Products() {

  function getAllProducts(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }
  const {data , isLoading}=useQuery("products",getAllProducts)
  console.log(data);

  return( isLoading ? (
    <>
      <div className="d-flex align-items-center justify-content-center my-5 py-5">
        <i className="fas fa-spin fa-spinner fa-2x"></i>
      </div>
    </>
  ) : (
<div className="row">
  {data?.data.data.map((product)=>{
    return <div key={product.id} className="col-md-3">
      <Product product={product}/>
    </div>
  })}
</div>)

)}
