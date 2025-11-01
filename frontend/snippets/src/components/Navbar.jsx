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

  const [open, setOpen] = useState(false);

  // close mobile menu on route change or resize (optional safety)
  useEffect(() => {
    const hideOnResize = () => {
      if (window.innerWidth > 768) setOpen(false);
    };
    window.addEventListener("resize", hideOnResize);
    return () => window.removeEventListener("resize", hideOnResize);
  }, []);


  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/"><img src='/logo4.png' alt = "logo" width= "40px"></img>CodeSnip Club</Link>
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
              <Link
                to="/mySnippets"
                className={location.pathname === '/mySnippets' ? 'active' : ''}
              >
                My snipppets
              </Link>
              <button onClick={handleLogout}>Logout</button>
              <span className="username">👤 {user.username}</span>

              </>)}

               {/* Hamburger button */}
        <button
          className={`hamburger ${open ? "is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>

        {/* Mobile menu */}
        <div className={`mobile-menu ${open ? "show" : ""}`} role="menu">
          <ul>
            <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link to="/addSnippet" onClick={() => setOpen(false)}>Add Snippet</Link></li>
            <li><Link to="/my-snippets" onClick={() => setOpen(false)}>My Snippets</Link></li>
            <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Navbar
