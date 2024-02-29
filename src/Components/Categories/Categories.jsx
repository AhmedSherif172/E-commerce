import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function Categories() {
  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data, isLoading } = useQuery("categories", getAllCategories);
  useEffect(() => {
    getAllCategories();
  }, []);

  return isLoading ? (
    <>
      <div className="d-flex align-items-center justify-content-center my-5 py-5">
        <i className="fas fa-spin fa-spinner fa-2x"></i>
      </div>
    </>
  ) : (
    <div className="row g-4 py-5 ">
      {data?.data.data.map((category, index) => {
        return (
          <Link key={index} className="col-md-4 ">
            <div className=" rounded-2 card border border-1 p-3 ">
              <div>
                <img
                  style={{ height: 400 }}
                  className="w-100"
                  src={category.image}
                  alt=""
                />
              </div>
              <div className="p-3  text-center fs-3 fw-bold text-success  ">
                {category.name}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
