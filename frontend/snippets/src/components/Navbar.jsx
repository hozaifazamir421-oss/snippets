import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const location = useLocation() // to highlight active link
  const {user, logout} = useAuth()
  const navigate = useNavigate()
  

  const handleLogout = async ()=>{
      try {
        await logout()
        console.log("logout successfull")
        navigate('/login');
      } catch (error) {
        console.log("logout failed: " ,error)
      }
  }
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/"><img src='logo4.png' width= "40px"></img>CodeSnip Club</Link>
      </div>
      <div className="navbar-links">
        <Link
          to="/"
          className={location.pathname === '/' ? 'active' : ''}
        >
          Home
        </Link>
        <Link
          to="/addSnippet"
          className={location.pathname === '/addSnippet' ? 'active' : ''}
        >
          Add Snippet
        </Link>
        {!user?(<>
              <Link to= "/login">Login</Link>
              <Link to = '/register' >Register</Link>
            </>
            ):(// if user is logged in.
            <>
              <button onClick={handleLogout}>Logout</button>
              <span className="username">👤 {user.username}</span>

              </>)}
      </div>
    </header>
  )
}

export default Navbar
