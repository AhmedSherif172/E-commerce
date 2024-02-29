import { createContext, useContext, useEffect, useState } from "react";



export const WishlistContext= createContext()

export default function WishlistContextProvider({children}){
    const [WishListContent , setWishListContent]=useState(false)
    return <WishlistContext.Provider value={{WishListContent ,setWishListContent}}>
        {children}
    </WishlistContext.Provider>
}