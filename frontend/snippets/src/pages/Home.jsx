import React from 'react'
import Snippets from '../components/Snippets'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';



function Home() {
  const navigate = useNavigate();
  const auth = useAuth()

  const addSnippet = ()=>{
    navigate('/addSnippet')
  }
  
  

  return (
    <>
    {/* home
    <button onClick={addSnippet}>add Snippets</button> */}
    
    <div className='home-content'>

    <h1>Your team's Code Snippets library!</h1>
      <p>Why write repetitive code when you can copy.</p>
      
    </div>
    
    
    <Snippets/>
    </>
  )
}

export default Home