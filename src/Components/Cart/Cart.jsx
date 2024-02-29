import axios from "axios";
import React, { useEffect, useState } from "react";
import CartProduct from "../CartProduct/CartProduct";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function Cart() {
  const [isLoadind, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState([]);

  async function getCartProducts() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      setCart(data);
      setCartId(data.data._id);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    getCartProducts();
  }, []);

  async function updateProductCount(productId,count){
    if (count === 0) {
      removeCartProducts(productId)
    }else{
    const { data } = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        count
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setCart(data);}
  }

  

   function removeCartProducts(productId) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(async(result) => {
      if  (result.isConfirmed) {
        const { data } = await axios.delete(
          "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setCart(data);
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
    
  }

   function clearCart() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(async(result) => {
      if (result.isConfirmed) {
        setIsLoading(true)
    const { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(data);
    setCart(data);
    setIsLoading(false)
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
    
  }



  return isLoadind ? (
    <>
      <div className="d-flex align-items-center justify-content-center my-5 py-5">
        <i className="fas fa-spin fa-spinner fa-2x"></i>
      </div>
    </>
  ) : (
    <>
      {cart.data?.products.length > 0 ? (
        <div className="my-5">
          <button onClick={() => clearCart()} className="btn btn-outline-danger d-block ms-auto">
            Clear Cart
          </button>

          {cart.data?.products.map((cartProduct, index) => {
            return (
              <CartProduct key={index} removeCartProducts={removeCartProducts} cartProduct={cartProduct} updateProductCount={updateProductCount}/>
            );
          })}

          <div className="d-flex justify-content-between">
            <Link to={"/address/"+cartId} className="btn bg-main text-white">CheckOut</Link>
            <p>Total cart Price: {cart.data?.totalCartPrice}EGP</p>
          </div>
        </div>
      ) : (
        <h2 className="alert alert-warning text-center my-5">
          No products in your cart
        </h2>
      )}
    </>
  );
}
