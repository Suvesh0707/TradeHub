import React from 'react'
import CartPage from './pages/CartPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<SignupPage/>}></Route>
        <Route path='/cartpage' element={<CartPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
