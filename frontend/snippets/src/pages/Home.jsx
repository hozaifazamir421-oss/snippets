import React from 'react'
import Snippets from '../components/Snippets'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import User from '../components/AdminRoute';



function Home() {
  
  const {user} = useAuth()
  const isAdmin = user && (user.role === "ADMIN")

  
  
  

  return (
    <>
    {/* home
    <button onClick={addSnippet}>add Snippets</button> */}
    
    <div className='home-content'>

    <h1>Your team's Code Snippets library!</h1>
      <p>Why write repetitive code when you can copy.</p>
      <p>Create, Search, Copy the codes you want.</p>
      
    </div>
    
    
    <Snippets/>
    {isAdmin && <User/>}
    </>
  )
}

export default Home