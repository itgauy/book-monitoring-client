import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const capitalize = (str) => {
  if (!str) return 'N/A';
  return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Get initials from name
const getInitials = (name) => {
  if (!name) return 'NA';
  return name.split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

const Home = () => {
  const [logData, setLogData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchLatestLog = async () => {
    try {
      const response = await axios.get(`${API_URL}/logs/latest`)
      // kahit no log is found, this isn't an error state
      // The API call was successful, just returned no data
      setLogData(response.data?.log || null)
      setError(null)
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setLogData(null)
        setError(null)
      } else {
        console.error('Error fetching latest log:', err)
        setError('Failed to load the latest log. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLatestLog()

    const pollingInterval = setInterval(() => {
      fetchLatestLog()
    }, 2000)

    return () => clearInterval(pollingInterval)
  }, [])

  if (loading && !logData) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <div className='flex flex-col items-center'>
          <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg text-gray-600">Loading data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <div className='p-6 max-w-md bg-red-50 border border-red-200 rounded-lg'>
          <h2 className='text-xl font-semibold text-red-700 mb-2'>Error</h2>
          <p className='text-red-600'>{error}</p>
          <button
            onClick={fetchLatestLog}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!logData) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <div className='flex flex-col items-center justify-center p-12 rounded-lg w-full max-w-xl text-center'>
          <svg className="w-16 h-16 text-gray-300 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No Activity Yet</h3>
          <p className="text-gray-500">No log entries have been recorded. Tap a library card to time-in.</p>
        </div>
      </div>
    )
  }

  const formattedDate = logData ? new Date(logData.createdAt).toLocaleString() : '';

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>
      {/* Loading Indicator for Refreshes */}
      {loading && (
        <div className="fixed top-4 right-4">
          <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}

      {/* Container */}
      <div className='flex flex-col items-center justify-center border border-neutral-200 p-12 rounded-lg w-full max-w-xl shadow-xl shadow-neutral-200/20'>
        <div className='flex flex-col justify-center items-center'>
          {/* Profile - Updated to use initials similar to UserData */}
          <div className='flex items-center justify-center bg-neutral-800 w-40 h-40 rounded-full overflow-hidden ring-2 ring-offset-4 ring-neutral-200'>
            <span className='text-6xl font-bold text-white'>
              {getInitials(logData?.name)}
            </span>
          </div>
          <h4 className='text-center mt-5 text-2xl font-bold'>{capitalize(logData?.name)}</h4>
          <span className='text-neutral-800 text-xl text-center'>{logData?.userID || 'N/A'}</span>

          {/* Log Type Badge */}
          <div className="flex flex-col items-center mt-3">
            <span className="text-neutral-500 text-sm mt-2">{formattedDate}</span>
          </div>
        </div>

        {/* Datas */}
        <div className='grid grid-cols-2 gap-x-2 gap-y-8 mt-10 w-full'>
          {/* Gender */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>{capitalize(logData?.gender)}</span>
            <span className='block text-neutral-500'>Gender</span>
          </div>

          {/* Role */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>{capitalize(logData?.role)}</span>
            <span className='block text-neutral-500'>Role</span>
          </div>

          {/* Program */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>{capitalize(logData?.program)}</span>
            <span className='block text-neutral-500'>Program</span>
          </div>

          {/* Contact Number */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>{logData?.contactNumber || 'N/A'}</span>
            <span className='block text-neutral-500'>Contact Number</span>
          </div>

          {/* Clearance */}
          <div>
            <span className={`inline-block font-semibold text-lg px-3 py-1 rounded-full ${logData?.isCleared === true || logData?.isCleared === "true" || logData?.clearance === "Cleared"
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
              }`}>
              {logData?.isCleared === true || logData?.isCleared === "true" || logData?.isCleared === "Cleared"
                ? 'Cleared'
                : 'Not Cleared'}
            </span>
            <span className='block text-neutral-500 mt-1'>Clearance</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home