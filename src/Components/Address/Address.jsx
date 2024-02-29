import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
function Address() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const { cartId } = useParams();

  const validate = Yup.object({
    details: Yup.string().required("Details is required"),
    city: Yup.string().required("City is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "Enter a valid phone number"),
  });

  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    handleBlur,
    isValid,
  } = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: async () => {
      setErrorMsg("");
      setisLoading(true);
      try {
        const { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
          {
            shippingAddress: values,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
            params: {
              url: "http://localhost:3000",
            },
          }
        );
        window.open(data.session.url,"_self")
        console.log(data);
      } catch (error) {
        setErrorMsg(error.response.data.message);
      }
      setisLoading(false);
    },

    validationSchema: validate,
  });

  return (
    <form onSubmit={handleSubmit} className="w-75 my-5  m-auto">
      <label htmlFor="details" className="my-1">
        Details:
      </label>
      <input
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.details}
        type="text"
        className="form-control mb-3"
        id="details"
        name="details"
      />
      {errors.details && touched.details && (
        <p className=" alert alert-danger ">{errors.details} </p>
      )}

      <label htmlFor="phone" className="my-1">
        Phone:
      </label>
      <input
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.phone}
        type="tel"
        className="form-control mb-3"
        id="phone"
        name="phone"
      />
      {errors.phone && touched.phone && (
        <p className=" alert alert-danger ">{errors.phone} </p>
      )}

      <label htmlFor="city" className="my-1">
        City:
      </label>
      <input
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.city}
        type="text"
        className="form-control mb-3"
        id="city"
        name="city"
      />
      {errors.city && touched.city && (
        <p className=" alert alert-danger ">{errors.city} </p>
      )}

      <button
        type="submit"
        className="btn bg-main px-3 text-white ms-auto d-block"
      >
        Order
      </button>
    </form>
  );
}

export default Address;
