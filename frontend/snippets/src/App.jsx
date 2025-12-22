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



const router = createBrowserRouter([
  {path: '/', element: <Layout/>, children:[
    {index: true, path: '/', element: <Home/>},
    {path: '/addSnippet', element:(<ProtectedRoute><AddSnippet/> </ProtectedRoute>)},
    {path: '/editSnippet/:id', element: <ProtectedRoute><EditSnippet/></ProtectedRoute>},
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