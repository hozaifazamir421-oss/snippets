import React from 'react'
import Snippets from '../components/Snippets'
function Home() { 

  return (
    <>
    <div className='home-content'>

    <h1>Your team's Code Snippets library!</h1>
      <p>Why write repetitive code when you can copy.</p>
      <p>Create, Search, Copy the codes you want.</p>
      
    </div>
    <Snippets/>
    </>
  )
}

export default Home