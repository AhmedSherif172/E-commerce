import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { addProductToCart } from "../Product/Product";
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function ProductDetails() {
  const [isLoadind, setIsLoading] = useState(false);
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});

  async function getProductDetails() {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/" + id
    );
    setProductDetails(data.data);
    console.log(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getProductDetails();
  }, []);
  return (
    <>
      {isLoadind ? (
        <>
          <div className="d-flex align-items-center justify-content-center my-5 py-5">
            <i className="fas fa-spin fa-spinner fa-2x"></i>
          </div>
        </>
      ) : (
        <div className="row align-items-center py-5">
          <div className="col-md-3">
            <Slider {...settings}>
              
                    {productDetails.images?.map((image , index)=>{
                        return <div key={index}>
                            <img  className="w-100" src={image} alt="" />
                        </div> 
                    })}
              
            </Slider>

          </div>
          <div className="col-md-9">
            <h2 className="mt-2">{productDetails?.title}</h2>
            <h5 className="font-sm text-main mt-2">
              {productDetails?.category?.name}
            </h5>
            <p className="mt-2">{productDetails?.description}</p>
            <p className="d-flex justify-content-between mt-2">
              <span>{productDetails?.price} EGP</span>
              <span>
                <i className="fas fa-star rating-color me-1"></i>
                <span>{productDetails?.ratingsAverage}</span>
              </span>
            </p>
            <button onClick={()=>{addProductToCart(productDetails._id)}} className="btn bg-main text-white w-100 mt-2">
              Add To Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
