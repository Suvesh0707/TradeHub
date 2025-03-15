import React from 'react'
<<<<<<< HEAD
import CartPage from './pages/CartPage'
=======
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
>>>>>>> 652ede1424312e37b36a2a30f0b284e443eaf027

function App() {
  return (
    <>
<<<<<<< HEAD
      <CartPage/>
=======
    <Router>
      <Routes>
        <Route path='/' element={<SignupPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
      </Routes>
    </Router>
>>>>>>> 652ede1424312e37b36a2a30f0b284e443eaf027
    </>
  )
}

export default App
