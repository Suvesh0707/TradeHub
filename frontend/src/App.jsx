import React from 'react'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import Productid from './pages/Productid'
import Sidebar from './pages/Sidebar'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<SignupPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/Dashboard' element={<DashboardPage/>}></Route>
        <Route path='/Product' element={<Productid/>}></Route>
        <Route path='/sidebar' element={<Sidebar/>}></Route>


        
      </Routes>
    </Router>
    </>
  )
}

export default App