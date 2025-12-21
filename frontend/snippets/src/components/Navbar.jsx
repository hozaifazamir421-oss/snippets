import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useAuth } from '../context/AuthContext'
import { useState , useEffect} from 'react'

function Navbar() {
  const location = useLocation() // to highlight active link
  const {user, logout} = useAuth()
  const navigate = useNavigate()
  const isAdmin = user && (user.role === "ADMIN")
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto'
  }, [isMenuOpen])

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
        <Link to="/"><img src='/logo4.png' alt = "logo" width= "40px"></img>CodeSnip Club</Link>
      </div>

      {/* Hamburger */}
      <button
        className="hamburger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* ✅ Dark overlay */}
      {isMenuOpen && (
        <div
          className="overlay"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
          ✕
        </button>
        <Link
          to="/"
          className={location.pathname === '/' ? 'active' : ''}
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/addSnippet"
          className={location.pathname === '/addSnippet' ? 'active' : ''}
          onClick={() => setIsMenuOpen(false)}
        >
          Add Snippet
        </Link>

        {!user ? (
          <>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
          </>
        ) : (
          <>
            <Link
              to="/mySnippets"
              className={location.pathname === '/mySnippets' ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              My Snippets
            </Link>
            <Link 
             to='/admin/users'
             className= {location.pathname === '/admin/users' ? 'active' : ''}
             onClick={()=>setIsMenuOpen(false)}
            >
              Manage Users
            </Link>
            <button onClick={handleLogout} className='logout'>Logout</button>
            <span className="username">👤 {user.username}</span>
          </>
        )}
      </div>


      {/*desktop part=---------------------------------------------------- */}
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
              <Link
                to="/mySnippets"
                className={location.pathname === '/mySnippets' ? 'active' : ''}
              >
                My snipppets
              </Link>
              {isAdmin && (<> <Link
                to ="/admin/users"
                className={location.pathname === '/admin/users' ? 'active' : ''}
              >
                Manage Users
              </Link></>)}
              <button onClick={handleLogout}>Logout</button>
              <span className="username">👤 {user.username}</span>

              </>)}
      </div>
    </header>
  )
}

export default Navbar
