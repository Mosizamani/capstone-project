import { Link } from 'react-router-dom'
import './Navbar.css'
import { useState } from 'react';

function Navbar() {
const [isOpen, setIsOpen] = useState(false);

const toggleMenu = () => {
    setIsOpen(!isOpen);
}

return (
    <nav className="navbar">
        <div className="logo">
            <Link to="/"><img src="" alt="Logo" className="logo-image" /></Link>
        </div>
        <div className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
            <Link to="/">Alasht®</Link>
            <Link to="/services">Services</Link>
            <Link to="/products">Services</Link>
            <Link to="/workshops">Workshops</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>       
        </div>
    </nav>
)
}

export default Navbar