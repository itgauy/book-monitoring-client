import React from 'react'
import { Navigate } from 'react-router-dom'

const Auth = ({ children }) => {
  const token = localStorage.getItem('token')
  const userType = localStorage.getItem('userType')
  return token && (userType === 'librarian') ? children : <Navigate to="/login" />
}

export default Auth