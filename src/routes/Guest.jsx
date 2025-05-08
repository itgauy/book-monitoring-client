import React from 'react'
import { Navigate } from 'react-router-dom'

const Guest = ({ children }) => {
  const token = localStorage.getItem('token')
  const userType = localStorage.getItem('userType')
  return token && (userType === 'librarian') ? <Navigate to="/userdata" /> : children
}

export default Guest