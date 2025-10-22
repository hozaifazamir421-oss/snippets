import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation() // to highlight active link

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">CodeSnip Club</Link>
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
      </div>
    </header>
  )
}

export default Navbar
