import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import WishListProduct from "../WishListProduct/WishListProduct";
import { WishlistContext } from "../../contexts/WishlistContext/WishlistContext";

export default function WishList() {
  const [isLoading, setIsLoading] = useState(false);
  const [isItemDeleting, setisItemDeleting] = useState(false);
  const [wishlist, setWishList] = useState([]);

  async function getWishListProducts() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      setWishList(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function removeWishListProducts(productId) {
    setisItemDeleting(true);
    const { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/wishlist/" + productId,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      setWishList(data);
    } catch (error) {
      console.log(error);
    }
    setisItemDeleting(false);
  }

  useEffect(() => {
    getWishListProducts();
  }, []);
  return isLoading ? (
    <>
      <div className="d-flex align-items-center justify-content-center my-5 py-5">
        <i className="fas fa-spin fa-spinner fa-2x"></i>
      </div>
    </>
  ) : (
    <>
    {wishlist.data?.length > 0? (
      <div className="my-5">
        {wishlist.data?.map((wishProduct, index) => {
          return (
            <WishListProduct
              key={index}
              isItemDeleting={isItemDeleting}
              removeWishListProducts={removeWishListProducts}
              wishProduct={wishProduct}
            />
          );
        })}
      </div>
    ) : (
      <h2 className="alert alert-warning text-center my-5">
          No products in your WishList
        </h2>
    )}
    </>
  );
  
}
