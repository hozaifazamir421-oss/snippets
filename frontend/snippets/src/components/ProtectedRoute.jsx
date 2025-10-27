import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children})=>{
    const {user, loading} = useAuth()

    if(loading) return <div>Loding...</div>

    if(!user){
        return <Navigate to = '/login' replace/>
    }
    return children;

}
export default ProtectedRoute