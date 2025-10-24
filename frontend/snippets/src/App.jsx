import React from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/Layout'
import axios from 'axios'
import AddSnippet from './pages/AddSnippet'
import EditSnippet from './pages/EditSnippet'




//this gets all the available snippets present in the database.
const getAllSnippets = async()=>{
  let allSnippets = []
  try{await axios.get(`http://localhost:3000/snippets`).then(res=>{
    allSnippets = res.data
  })
  
  return allSnippets
}catch(error){
  console.error("Error loading snippets:", error);
  throw new Error("Could not load snippets from the server.")
  }
}

const getOneSnippet = async({params})=>{
    try{
      const res = await axios.get(`http://localhost:3000/snippets/${params.id}`)
      return res.data;
    }
    catch(error){
      console.log(`Error loading the snippet`, error);
      throw new Error("Could not load snippet from the server")
    }
}


const router = createBrowserRouter([
  {path: '/', element: <Layout/>, children:[
    {index: true, path: '/', element: <Home/>, loader: getAllSnippets},
    {path: '/addSnippet', element: <AddSnippet/>},
    {path: '/editSnippet/:id', element: <EditSnippet/>,loader: getOneSnippet},
  ]}
  
])

function App() {

  return (
    <>
    <RouterProvider  router = {router}></RouterProvider>
    </>
  )
}

export default App