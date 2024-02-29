import React, { useContext } from 'react'
import { authcontext } from '../../contexts/Authconext/Authcontext'
import Login from '../Login/Login';

export default function ProtectedRoute({children}) {
    const { isLoggedIn, setIsLoggedIn } = useContext(authcontext);
  return (
    <div>
        {isLoggedIn ? children :<Login/>}
    </div>
  )
}
