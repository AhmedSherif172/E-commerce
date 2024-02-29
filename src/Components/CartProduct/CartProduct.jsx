import React from 'react'

export default function CartProduct({cartProduct ,removeCartProducts , updateProductCount}) {
  console.log(cartProduct);
  return (
    
        <div className="cart-product shadow rounded-2 my-3">
              <div className="row align-items-center">
                <div className="col-md-2">
                  <img className="w-100" src={cartProduct.product.imageCover} alt="" />
                </div>
                <div className="col-md-8">
                  <h2>{cartProduct.product.title}</h2>
                  <h5>{cartProduct.product.category.name}</h5>
                  <p className="d-flex justify-content-between">
                    <span>{cartProduct.price} EGP</span>
                    <span>
                      <i className=" fas fa-star rating-color me-1"></i>{" "}
                      {cartProduct.product.ratingsAverage}
                    </span>
                  </p>
                  <p>
                    <span className="fw-bolder">Total Price:</span> {cartProduct.count * cartProduct.price} EGP
                  </p>
                </div>
                <div className="col-md-2">
                  <button onClick={()=>removeCartProducts(cartProduct.product._id)} className="btn text-danger">Remove</button>
                  <div className="d-flex align-items-center">
                    <button onClick={()=> updateProductCount(cartProduct.product._id,cartProduct.count-1)} className="btn bg-main text-white mx-2">-</button>
                    <span>{cartProduct.count}</span>
                    <button onClick={()=> updateProductCount(cartProduct.product._id,cartProduct.count+1)} className="btn bg-main text-white mx-2">+</button>
                  </div>
                </div>
              </div>
            </div>
          
    
  )
}
