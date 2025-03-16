import React from 'react'
import CartPage from './pages/CartPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductCard from './pages/ProductCard'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<SignupPage/>}></Route>
        <Route path='/cartpage' element={<CartPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/homepage' element={<HomePage/>}></Route>
        <Route path='/productcard' element={<ProductCard/>}></Route>
        <Route path='/navbar' element={<Navbar isLoggedin="true"/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
