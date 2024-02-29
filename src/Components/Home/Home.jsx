import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import Slider from "react-slick";
import sliderImg1 from "../../Assets/images/grocery-banner.png"
import sliderImg2 from "../../Assets/images/grocery-banner-2.jpeg"
import homeImg1 from "../../Assets/images/blog-img-1.jpeg"
import homeImg2 from "../../Assets/images/blog-img-2.jpeg"
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";


export default function Home() {
  const [isLoadind, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  async function getAllProducts() {
    setIsLoading(true)
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProducts(data.data);
    console.log(data);
    setIsLoading(false)
  }

  useEffect(() => {
    getAllProducts();
  }, []);
  return (isLoadind ? (
    <>
      <div className="d-flex align-items-center justify-content-center my-5 py-5">
        <i className="fas fa-spin fa-spinner fa-2x"></i>
      </div>
    </>
  ) : (
    <>
      <div className="row g-0 mx-3 my-5">
        <div className="col-10">
          <Slider {...settings} >
            <div><img className="w-100" src={sliderImg1} alt="" /></div>
            <div><img className="w-100" src={sliderImg2} alt="" /></div>
          </Slider>
        </div>
        <div className="col-2">
          <img className="w-100 h-50 " src={homeImg1} alt="" /> 
          <img className="w-100 h-50  " src={homeImg2} alt="" />
        </div>
      </div>


      <CategoriesSlider/>
      
      <div className="row">
        {products.map((product) => {
          return (
            <div key={product.id} className=" col-md-3 ">
              <Product product={product} />
            </div>
          );
        })}
      </div>
    </>
  ));
}
