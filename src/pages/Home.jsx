import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const capitalize = (str) => {
  if (!str) return 'N/A';
  return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const Home = () => {
  const [logData, setLogData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchLatestLog = async () => {
    try {
      const response = await axios.get(`${API_URL}/logs/latest`)
      if (response.data && response.data.log) {
        setLogData(response.data.log)
      } else {
        throw new Error('Invalid response format')
      }
      setError(null)
    } catch (err) {
      console.error('Error fetching latest log:', err)
      setError('Failed to load the latest log. Please try again.')
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

  if (error && !logData) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <div className='p-6 max-w-md bg-red-50 border border-red-200 rounded-lg'>
          <h2 className='text-xl font-semibold text-red-700 mb-2'>Error</h2>
          <p className='text-red-600'>{error || 'No log data available'}</p>
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
          {/* Profile */}
          <div className='relative w-40 h-40 rounded-full overflow-hidden ring-2 ring-offset-4 ring-neutral-200'>
            <img src='https://placehold.co/30x30' alt="Profile" className='absolute object-cover w-full h-full' />
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

          {/* Status */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>{capitalize(logData?.status)}</span>
            <span className='block text-neutral-500'>Status</span>
          </div>


          {/* Clearance */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>{capitalize(logData?.clearance)}</span>
            <span className='block text-neutral-500'>Clearance</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home