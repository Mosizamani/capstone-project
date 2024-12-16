import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Services from './components/Services'
import ProfessionalSignup from './components/ProfessionalSignup'
import Login from './components/Login'
import Signup from './components/SignUp'
import NotFound from './components/NotFound'
import Navbar from './components/Navbar'
import ProDashboard from './components/ProDashboard'
import ClientDashboard from './components/ClientDashboard'
import ProjectForm from './components/ProjectForm'


function App() {

  const handleFormSubmit = (formData) => {
    console.log("Submitted client data:",formData)
  }

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/services" element={<Services />} ></Route>
        <Route path="/professionalsignup" element={<ProfessionalSignup />} ></Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/signup" element={<Signup />} ></Route>
        <Route path="*" element={<NotFound />} ></Route>
        <Route path="/pro-dashboard" element={<ProDashboard />} ></Route>
        <Route path="/client-dashboard" element={<ClientDashboard />} ></Route>
        <Route path="/projects/new" element={<ProjectForm onSubmit={handleFormSubmit} />} />
      </Routes>
    </>
  )
}

export default App
