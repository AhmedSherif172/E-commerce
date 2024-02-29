import axios, { Axios } from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { authcontext } from '../../contexts/Authconext/Authcontext';


export default function VerifyCode() {

  const [errorMsg,setErrorMsg]=useState("")
  const [isLoading,setisLoading]=useState(false)
  const navigate=useNavigate()
  const {isLoggedIn,setIsLoggedIn}=useContext(authcontext)






  const {values , handleSubmit ,handleChange , errors ,touched , handleBlur , isValid}= useFormik({
    initialValues:{
      
        resetCode:"",
    },
    onSubmit: async() => {
      setErrorMsg("")
      try {
        setisLoading(true)
        let {data} =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values  )
        if (data.status == "Success") {
            navigate("/reset-password")
            console.log("gamed");
        }else{
            console.log("a7a b2a");
            console.log(data);
            setErrorMsg(data.message)
        }
      } catch (error) {
        setErrorMsg(error.response.data.message)
      }
      setisLoading(false)
    },
  })



  return <>
    <div className="w-75 m-auto my-5">
      <h1>Verify Reset Code :</h1>
      <form onSubmit={handleSubmit}>
        

        <label htmlFor="resetCode" className='my-1'>Enter the code:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.resetCode} type="text" className='form-control mb-3' id='resetCode' name='resetCode' />



        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        <div className=' d-flex align-items-end '>
        {isLoading ? 
        <button disabled type='button' className='btn bg-main px-3 text-white ms-auto d-block'> <i className='fas fa-spin fa-spinner'></i> </button>
        :
        <button type='submit' disabled={!isValid} className='btn bg-main px-3 text-white ms-auto d-block'>Verify</button>
        }
        </div>

      </form>
    </div>
  </>
}

