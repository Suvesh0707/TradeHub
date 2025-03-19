import React from 'react'
import CartPage from './pages/CartPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductCard from './pages/ProductCard'
import UploadProduct from './pages/UploadProduct'
import MyProductsPage from './pages/MyProduct'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OTPPage from './pages/Otp'
import YourPlacedOrder from './pages/YourPlacedOrder'
import SellerDashboard from './pages/SellerDashboard'

function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<SignupPage/>}></Route>
        <Route path='/cartpage' element={<CartPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/homepage' element={<HomePage/>}></Route>
        <Route path='/productcard' element={<ProductCard/>}></Route>
        <Route path='/uploadproduct' element={<UploadProduct/>}></Route>
        <Route path='/myproduct' element={<MyProductsPage/>}></Route>
        <Route path='/otp' element={<OTPPage/>}></Route>
        <Route path='/yourplacedorder' element={<YourPlacedOrder/>}></Route>
        <Route path='/sellerdashboard' element={<SellerDashboard/>}></Route>
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