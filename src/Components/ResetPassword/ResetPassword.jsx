import axios, { Axios } from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { authcontext } from '../../contexts/Authconext/Authcontext';


export default function ResetPassword() {

  const [errorMsg,setErrorMsg]=useState("")
  const [isLoading,setisLoading]=useState(false)
  const navigate=useNavigate()
  const {isLoggedIn,setIsLoggedIn}=useContext(authcontext)

  const validate = Yup.object({
    email:Yup.string().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,"Enter a vaild Email"),
    newPassword:Yup.string().required("Password is required").matches(/^(?=.*[0-9])(?=.*[ !@#$%^&])[a-zA-Z0-9!@#$%^&]{6,16}$/, "Password must contain special character , more than 8 characters and less than 18 characters"),
  
  })





  const {values , handleSubmit ,handleChange , errors ,touched , handleBlur , isValid}= useFormik({
    initialValues:{
      
      email:"",
      newPassword:"",
    },
    onSubmit: async() => {
      setErrorMsg("")
      try {
        setisLoading(true)
        let {data} =await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values  )
        
          setIsLoggedIn(true)
          console.log(data);
          localStorage.setItem("token",data.token)
          navigate("/home")
          
    
      } catch (error) {
        setErrorMsg(error.response.data.message)
      }
      setisLoading(false)
    },
    
    validationSchema:validate
  })



  return <>
    <div className="w-75 m-auto my-5">
      <h1>Reset your account password :</h1>
      <form onSubmit={handleSubmit}>
        

        <label htmlFor="email" className='my-1'>Email:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.email} type="email" className='form-control mb-3' id='email' name='email' />
        {errors.email && touched.email && <div className="alert alert-danger">{errors.email}</div>}


        <label htmlFor="newPassword" className='my-1'>Password:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.newPassword} type="password" className='form-control mb-3' id='newPassword' name='newPassword' />
        {errors.newPassword && touched.newPassword && <div className="alert alert-danger">{errors.newPassword}</div>}


        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        <div className=' d-flex align-items-end '>
        {isLoading ? 
        <button disabled type='button' className='btn bg-main px-3 text-white ms-auto d-block'> <i className='fas fa-spin fa-spinner'></i> </button>
        :
        <button type='submit' disabled={!isValid} className='btn bg-main px-3 text-white ms-auto d-block'>login</button>
        }
        </div>

      </form>
    </div>
  </>
}
