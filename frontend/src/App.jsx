import React from 'react'
import CartPage from './pages/CartPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductCard from './pages/ProductCard'
import UploadProduct from './pages/UploadProduct'
import MyProductsPage from './pages/MyProduct'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OTPPage from './pages/Otp'
import YourPlacedOrder from './pages/YourPlacedOrder'
import SellerDashboard from './pages/SellerDashboard'
import { useAuthStore } from './store/UseAuth'
import { useEffect } from 'react'

function App() {
  const {authUser, checkAuth} = useAuthStore()
  useEffect(()=>{
    console.log(authUser)
    checkAuth()
  },[checkAuth])
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<SignupPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/otp' element={<OTPPage/>}></Route>
        
        <Route path='/cartpage' element={authUser ?<CartPage/> :<Navigate to="/login" /> }/>
        <Route path='/homepage' element={authUser ?<HomePage/>: <Navigate to="/login" />}></Route>
        <Route path='/productcard' element={authUser ?<ProductCard/> : <Navigate to="/login" />}></Route>
        <Route path='/uploadproduct' element={authUser?<UploadProduct/>: <Navigate to="/login" />}></Route>
        <Route path='/myproduct' element={authUser? <MyProductsPage/>: <Navigate to="/login" />}></Route>
        <Route path='/yourplacedorder' element={authUser ? <YourPlacedOrder/>: <Navigate to="/login" />}></Route>
        <Route path='/sellerdashboard' element={authUser ?<SellerDashboard/>: <Navigate to="/login" />}></Route>
      </Routes>
    </Router>

    <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}
export default App