import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

function Register() {
    const {register: registerUser} = useAuth()
    const navigate = useNavigate()

    const [error, setError]= useState("")

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        watch,

    } = useForm()


    const onSubmit =async(data)=>{
        setError("")
        try {
            await registerUser(data)
            navigate('/')
        } catch (error) {
            setError(error.response?.data?.message || "Registration Failed")   
        }
    }
    const password = watch("password")
  return (
    <>
    <div className="auth-container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <p>{errors.username.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
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

        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Please confirm password",
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Register"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
    </>
  )
}

export default Register