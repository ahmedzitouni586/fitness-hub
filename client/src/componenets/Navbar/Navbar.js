import React from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import useLogout from "../../hooks/useLogout";

const Navbar = ({isLoggedIn, setIsLoggedIn}) => {

    const navigate = useNavigate();
    const logout = useLogout();
    const signOut = async () => {
      await logout();
      navigate('/SignIn');
  }
  
  const signout = () => {
    setIsLoggedIn(false);
    signOut();
  }

  return (
    <>
        <nav>
           <div className='NavbarContainer'>
                <Link to='/' className='Logo'>Fitness hub</Link>
                <input type='checkbox' className='toggle-menu'/>
                <div className='hamburger'></div>
                <ul className='nav-menu'>
                    <li className='nav-item'><a href='/#About' className='nav-link'>About</a></li>
                    <li className='nav-item'><Link to='/Exercices' className='nav-link'>Exercices</Link></li>
                    <li className='nav-item'><Link to='/Dashboard' className='nav-link'>Workout </Link></li>
                    <li className='nav-item'><Link to='/CalorieTracker' className='nav-link'>Calorie Tracker</Link></li>
                    <li className='nav-btn'>
                    
                    </li>
                    <li className='nav-btn'>
                      {!isLoggedIn && <Link to='/Register'>Sign In</Link>}
                      {isLoggedIn && <button onClick={signout}>Sign Out</button>}
                    </li>
                </ul>
                
           </div>
        </nav>
    </>
  )
}




export default Navbar
