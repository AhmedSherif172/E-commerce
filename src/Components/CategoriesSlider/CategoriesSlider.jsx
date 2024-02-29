import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

var settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 7,
};



export default function CategoriesSlider() {

  const [categories,setCategories]=useState([])

  async function getCategories(){
    const {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    setCategories(data.data);
  }
  useEffect(()=>{
    getCategories()
  },[])
  return (
    
      <Slider {...settings}>
        {categories.map((category,index) => {
          return <div key={index} className="">
            <img style={{height:200}} className="w-100" src={category.image} alt="" />
            <h4>{category.name}</h4>
          </div>
        })}
      </Slider>
  );
}
