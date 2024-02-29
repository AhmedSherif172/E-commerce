import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function Brands() {
  const [brands, setBrands] = useState([]);

  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const { data, isLoading } = useQuery("brand", getAllBrands);  

  return (isLoading ? (
    <>
      <div className="d-flex align-items-center justify-content-center my-5 py-5">
        <i className="fas fa-spin fa-spinner fa-2x"></i>
      </div>
    </>
  ) : (
    <>
      <div className="row g-4 py-5 ">
        {data?.data.data.map((brand, index) => {
          return (
            <div key={index} className="col-md-3 ">
              <div className=" rounded-2 card border border-1 p-3 ">
                <div>
                  <img className="w-100" src={brand.image} alt="" />
                </div>
                <div className="p-3  text-center fw-bold text-success  ">
                  {brand.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  ));
}
