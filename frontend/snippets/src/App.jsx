import React from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/Layout'
import axios from 'axios'
import AddSnippet from './pages/AddSnippet'
import EditSnippet from './pages/EditSnippet'
import Register from './pages/Register'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Mysnippets from './pages/Mysnippets'
import AdminRoute from './components/AdminRoute'
import AdminUsers from './pages/AdminUsers'


const baseURL = import.meta.env.VITE_API_URL

//this gets all the available snippets present in the database.
const getAllSnippets = async()=>{
  let allSnippets = []
  try{await axios.get(`${baseURL}/snippets`).then(res=>{
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
      const res = await axios.get(`${baseURL}/snippets/${params.id}`)
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
    {path: '/addSnippet', element:(<ProtectedRoute><AddSnippet/> </ProtectedRoute>)},
    {path: '/editSnippet/:id', element: <EditSnippet/>,loader: getOneSnippet},
    {path: '/register', element: <Register/>},
    {path: '/login', element: <Login/>},
    {path: '/mySnippets', element:<ProtectedRoute><Mysnippets/></ProtectedRoute> },
    {path: '/admin/users', element: <AdminRoute><AdminUsers/></AdminRoute>}
  ]}
  
])

function App() {

  return (
    <>
    <AuthProvider>
    <RouterProvider  router = {router}></RouterProvider>
    </AuthProvider>
    </>
  )
}

export default App