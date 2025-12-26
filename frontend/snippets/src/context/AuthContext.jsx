import React, {  createContext, useState } from 'react'
import api,{injectStore} from '../api/axios'
import { useEffect } from 'react'
import { useContext } from 'react'

export const AuthContext = createContext()

export const useAuth = ()=>{
    return useContext(AuthContext)
}

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [loading, setLoading] = useState(true)

    //access token refresh on initial load
    const refreshAccessToken = async ()=>{
      try {
        const res = await api.post('/auth/refresh-token');
        setAccessToken(res.data.accessToken)
        setUser(res.data.user)        
        
      } catch (error) {
        setUser(null)
        setAccessToken(null)        
      }
      finally{
        setLoading(false)
      }
    }

    useEffect(()=>{
      // injectStore({ accessToken, setAccessToken, setUser, logout });
      refreshAccessToken()
    },[])
    useEffect(()=>{
      injectStore({ accessToken, setAccessToken, setUser, logout });
    },[accessToken])


    const login = async(credentials)=>{
        const res = await api.post('/auth/login',credentials);
        setAccessToken(res.data.accessToken)
        setUser(res.data.user)
    }

    const logout = async()=>{
      await api.post('/auth/logout')
      setAccessToken(null)
      setUser(null)
    }

    const register =async(data)=>{
      const res = await api.post('/auth/register',data)
      setAccessToken(res.data.accessToken)
      setUser(res.data.user)
    }

    return (
      <AuthContext.Provider value ={{user, setUser,accessToken, loading, login, refreshAccessToken, logout, register}}>
        {children}
      </AuthContext.Provider>
    )
}