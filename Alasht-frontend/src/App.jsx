import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Services from './components/Services'
import ProfessionalSignup from './components/ProfessionalSignup'
import Login from './components/Login'
import Signup from './components/SignUp'
import NotFound from './components/NotFound'
import Navbar from './components/Navbar'


function App() {

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/services" element={<Services />} ></Route>
        <Route path="/professionalsignup" element={<ProfessionalSignup />} ></Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/signup" element={<Signup />} ></Route>
        <Route path="*" element={<NotFound />} ></Route>
      </Routes>
    </>
  )
}

export default App
