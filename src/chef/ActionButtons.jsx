import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const ActionButtons = () => {
  const [borrowers, setBorrowers] = useState([])
  const [selectedUserID, setSelectedUserID] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetchBorrowers()
  }, [])

  const fetchBorrowers = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get(`${API_URL}/borrowers`)

      if (response.data && response.data.borrowers) {
        setBorrowers(response.data.borrowers)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      setError('Failed to load users. Please try again.')
      console.error('Error fetching borrowers:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleUserSelect = (userID) => {
    setSelectedUserID(userID)
    setDropdownOpen(false)
    setSuccessMessage('')
    setError('')
  }

  const handleCreateLog = async () => {
    if (!selectedUserID) {
      setError('Please select a user first')
      return
    }

    setIsSubmitting(true)
    setError('')
    setSuccessMessage('')

    try {
      const response = await axios.post(`${API_URL}/logs/user`, {
        userID: selectedUserID,
        logType: 'visit'
      })

      setSuccessMessage('Log created successfully!')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create log. Please try again.')
      console.error('Error creating log:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.dropdown-container')) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdownOpen])

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg shadow-md max-w-md mx-auto my-8">
      <h1 className="text-2xl font-bold text-center mb-6">Create User Log</h1>

      <div className="w-full">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select User:
          </label>
          <div className="dropdown-container relative w-full">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {selectedUserID || 'Select a user'}
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {loading ? (
                  <div className="px-4 py-2 text-gray-500 flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading users...
                  </div>
                ) : borrowers.length > 0 ? (
                  borrowers.map((borrower) => (
                    <div
                      key={borrower.userID}
                      onClick={() => handleUserSelect(borrower.userID)}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {borrower.userID} {borrower.name ? `- ${borrower.name}` : ''}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">No users found</div>
                )}
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <button
            onClick={handleCreateLog}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={!selectedUserID || isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Log...
              </div>
            ) : (
              'Create Log'
            )}
          </button>

          <button
            onClick={fetchBorrowers}
            className="text-sm text-blue-500 hover:text-blue-700 py-2"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh User List'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ActionButtons