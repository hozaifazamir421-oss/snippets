import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {useForm} from 'react-hook-form'
import './authcontainerstyle.css'

function Login() {
    const {login} = useAuth()
    const navigate = useNavigate()

    const [error, setError] = useState("")

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm()

    const onSubmit =async(data)=>{
        setError("")
        try {
            await login(data)
            navigate('/')
            
        } catch (error) {
            setError(error.response?.data?.message || "Login Failed")
        }
    }
    
    

    

  return (
    <>
    <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
            type='email'
            placeholder='Email'
            {...register("email",{
                required: "Email is required",
                pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                },
            })}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <input
            type="password"
            placeholder="Password"
            {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "At least 6 characters" },
            })}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
             </button>
        </form>

        {error && <p style={{color: "red"}}>{error}</p>}
    </div>
    </>
  )
}

export default Login