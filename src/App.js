import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Products from './Components/Products/Products';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Orders from './Components/Orders/Orders';
import Address from './Components/Address/Address';
import NotFound from './Components/NotFound/NotFound';
import AuthContextProvider from './contexts/Authconext/Authcontext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import AuthProtectedRout from './Components/ProtectedRoute/authProtectedRout';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import WishList from "./Components/WishList/WishList"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WishlistContextProvider from './contexts/WishlistContext/WishlistContext';
import ResetEmail from './Components/ResetEmail/ResetEmail';
import VerifyCode from './Components/VerifyCode/VerifyCode';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools } from 'react-query/devtools';




const queryClient = new QueryClient()

const router = createBrowserRouter([
  {path:"",element:<Layout/>,children:[
    {path:"",element:<Navigate to={"home"} />},

    {path:"login",element: <AuthProtectedRout><Login/></AuthProtectedRout> },
    {path:"register",element: <AuthProtectedRout><Register/></AuthProtectedRout>},
    {path:"verify-email",element: <AuthProtectedRout><ResetEmail/></AuthProtectedRout>},
    {path:"verify-code",element: <AuthProtectedRout><VerifyCode/></AuthProtectedRout>},
    {path:"reset-password",element: <AuthProtectedRout><ResetPassword/></AuthProtectedRout>},
    
    {path:"address/:cartId",element: <ProtectedRoute> <Address/> </ProtectedRoute>},  
    {path:"home",element:<ProtectedRoute> <Home/> </ProtectedRoute>},
    {path:"cart",element:<ProtectedRoute> <Cart/> </ProtectedRoute>},
    {path:"wishlist",element:<ProtectedRoute> <WishList/> </ProtectedRoute>},
    {path:"products",element:<ProtectedRoute> <Products/> </ProtectedRoute>},
    {path:"categories",element:<ProtectedRoute> <Categories/> </ProtectedRoute>},
    {path:"allorders",element:<ProtectedRoute> <Orders/> </ProtectedRoute>},
    {path:"brands",element:<ProtectedRoute> <Brands/> </ProtectedRoute>},
    {path:"allorders",element:<ProtectedRoute> <Orders/> </ProtectedRoute>},
    {path:"productdetails/:id",element:<ProtectedRoute> <ProductDetails/> </ProtectedRoute>},

    {path:"*",element:<NotFound/>},
  ]}
])

function App() {

  return <>
<QueryClientProvider client={queryClient}>
    <WishlistContextProvider>
      <AuthContextProvider>
        <RouterProvider router={router}> </RouterProvider>
      </AuthContextProvider>
    </WishlistContextProvider>
  <ToastContainer /> 
  <ReactQueryDevtools/>
</QueryClientProvider>
  </>
}

export default App;