import React, { Children, useContext } from 'react'
import { authcontext } from '../../contexts/Authconext/Authcontext';
import { Navigate } from 'react-router-dom';

export default function AuthProtectedRout({children}) {
    const { isLoggedIn} = useContext(authcontext);
  return (
    <>
        {isLoggedIn ? <Navigate to={"/home"}/> : children }
    </>
  )
  
}
