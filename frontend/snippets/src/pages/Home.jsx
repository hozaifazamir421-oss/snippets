import React from 'react'
import Snippets from '../components/Snippets'
import { useNavigate } from 'react-router-dom'


function Home() {
  const navigate = useNavigate();

  const addSnippet = ()=>{
    navigate('/addSnippet')
  }

  

  return (
    <>
    home
    <button onClick={addSnippet}>add Snippets</button>
    
    <Snippets/>
    </>
  )
}

export default Home