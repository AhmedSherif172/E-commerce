import { createContext, useContext, useEffect, useState } from "react";



export const authcontext= createContext()

export default function AuthContextProvider({children}){
    const [isLoggedIn , setIsLoggedIn]=useState(!!localStorage.getItem("token"))
    return <authcontext.Provider value={{isLoggedIn ,setIsLoggedIn}}>
        {children}
    </authcontext.Provider>
}