import React from 'react'
import CartPage from './pages/CartPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import Productid from './pages/Productid'
import Sidebar from './pages/Sidebar'
import HomePage from './pages/HomePage'
import ProductCard from './pages/ProductCard'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<SignupPage/>}></Route>
        <Route path='/cartpage' element={<CartPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/Dashboard' element={<DashboardPage/>}></Route>
        <Route path='/Product' element={<Productid/>}></Route>
        <Route path='/sidebar' element={<Sidebar/>}></Route>
        <Route path='/homepage' element={<HomePage/>}></Route>
        <Route path='/productcard' element={<ProductCard/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App