import React from 'react'

export default function WishListProduct({wishProduct , removeWishListProducts , isItemDeleting}) {
    
  return (

            <div className="cart-product shadow rounded-2 my-3">
              <div className="row align-items-center">
                <div className="col-md-2">
                  <img className="w-100" src={wishProduct.imageCover} alt="" />
                </div>
                <div className="col-md-8">
                  <h2>{wishProduct.title}</h2>
                  <h5>{wishProduct.category.name}</h5>
                  <p className="d-flex justify-content-between">
                    <span>{wishProduct.price} EGP</span>
                    <span>
                      <i className=" fas fa-star rating-color me-1"></i>{" "}
                      {wishProduct.ratingsAverage}
                    </span>
                  </p>
                </div>
                <div className="col-md-2">
                  {isItemDeleting?
                  <button disabled className="btn btn-danger px-4 text-white">
                    <i className="fas fa-spin fa-spinner"></i>
                  </button>
                  :
                  <button onClick={()=>{removeWishListProducts(wishProduct.id)}} className="btn btn-danger  text-white">Remove</button>
                  }
                </div>
              </div>
            </div>
  )
}
