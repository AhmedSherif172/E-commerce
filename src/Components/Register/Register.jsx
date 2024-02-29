import axios, { Axios } from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import * as Yup from "yup"

export default function Register() {

  const [errorMsg,setErrorMsg]=useState("")
  const [isLoading,setisLoading]=useState(false)
  const navigate=useNavigate()


  const validate = Yup.object({
    name:Yup.string().required("Name is required").min(3,"minimum length must be 3 letters").max(20,"maximun length must be 20 letters"),
    email:Yup.string().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,"Enter a vaild Email"),
    password:Yup.string().required("Password is required").matches(/^(?=.*[0-9])(?=.*[ !@#$%^&])[a-zA-Z0-9!@#$%^&]{6,16}$/, "Password must contain special character , more than 8 characters and less than 18 characters"),
    rePassword:Yup.string().required("Enter password again").oneOf([Yup.ref('password')], "Repassword does not match password"),
    phone:Yup.string().required("Phone number is required").matches(/^01[0125][0-9]{8}$/, "Enter a valid phone number")
  
  })





  const {values , handleSubmit ,handleChange , errors ,touched , handleBlur , isValid}= useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:"",
    },
    onSubmit: async() => {
      setErrorMsg("")
      try {
        setisLoading(true)
        let {data} =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values  )
        if (data.message=="success") {
          navigate("/login")
        }
      } catch (error) {
        setErrorMsg(error.response.data.message)
      }
      setisLoading(false)
    },
    
    validationSchema:validate
  })



  return <>
    <div className="w-75 m-auto my-5">
      <h1>Register Now :</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className='my-1'>Name:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.name} type="text" className='form-control mb-3' id='name' name='name' />
        {errors.name && touched.name && <div className="alert alert-danger">{errors.name}</div>}


        <label htmlFor="email" className='my-1'>Email:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.email} type="email" className='form-control mb-3' id='email' name='email' />
        {errors.email && touched.email && <div className="alert alert-danger">{errors.email}</div>}


        <label htmlFor="password" className='my-1'>Password:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.password} type="password" className='form-control mb-3' id='password' name='password' />
        {errors.password && touched.password && <div className="alert alert-danger">{errors.password}</div>}


        <label htmlFor="rePassword" className='my-1'>RePassword:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.rePassword} type="password" className='form-control mb-3' id='rePassword' name='rePassword' />
        {errors.rePassword && touched.rePassword && <div className="alert alert-danger">{errors.rePassword}</div>}


        <label htmlFor="phone" className='my-1'>phone:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.phone} type="tel" className='form-control mb-3' id='phone' name='phone' />
        {errors.phone && touched.phone && <div className="alert alert-danger">{errors.phone}</div>}


        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        {isLoading ? 
        <button disabled type='button' className='btn bg-main px-3 text-white ms-auto d-block'> <i className='fas fa-spin fa-spinner'></i> </button>
        :
        <button type='submit' disabled={!isValid} className='btn bg-main px-3 text-white ms-auto d-block'>Register</button>
        }

      </form>
    </div>
  </>
}
