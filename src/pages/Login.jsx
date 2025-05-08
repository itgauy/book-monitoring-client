import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, InputText } from '../components'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await axios.post(`${API_URL}/login`, formData)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userType', response.data.result.userType)
      navigate('/admin/userdata')
    } catch (err) {
      setError(err.response.data.message || 'An error occurred')
      setFormData(prevState => ({
        ...prevState,
        password: '',
      }))
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="border border-neutral-200 p-8 rounded-3xl shadow-xl shadow-neutral-200/30 w-full max-w-md">
        <div className='mb-6'>
          <h3 className="text-center">Login</h3>
          <p className='text-center'>Login to proceed.</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Username */}
          <fieldset className='flex flex-col gap-1'>
            <label htmlFor="username">Username</label>
            <InputText
              type="text"
              placeholder="Your username"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </fieldset>
          {/* Password */}
          <fieldset className='flex flex-col gap-1'>
            <label htmlFor="password">Password</label>
            <InputText
              type="password"
              placeholder="Your password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </fieldset>
          {/* Error Message */}
          {error && (
            <span className='block text-center text-red-500'>{error}</span>
          )}
          {/* Submit Button */}
          <Button
            variant='primary'
            type='submit'
            className='w-full mt-8'
          >
            Login
          </Button>
        </form>

        <div className="text-center mt-4">
          <a href="/" className="text-sm underline">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login