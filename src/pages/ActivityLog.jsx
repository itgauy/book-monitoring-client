import React, { useState, useEffect } from 'react'
import { Button, InputText } from '../components'
import { HiOutlineArrowRight, HiOutlineSearch, HiOutlineReply, HiOutlinePlusSm } from "react-icons/hi"
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const ActivityLog = () => {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  // Fetch all logs
  const fetchLogs = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/logs`)
      if (response.data && response.data.logs) {
        setLogs(response.data.logs)
      } else {
        throw new Error('Invalid response format')
      }
      setError(null)
    } catch (err) {
      console.error('Error fetching logs:', err)
      setError('Failed to load activity logs. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  // Filter logs based on search
  const filteredLogs = logs.filter(log => {
    if (!search) return true;
    const searchLower = search.toLowerCase()

    // Search across all string fields in the log
    return (
      log.userID?.toLowerCase().includes(searchLower) ||
      log.name?.toLowerCase().includes(searchLower) ||
      log.program?.toLowerCase().includes(searchLower) ||
      log.logType?.toLowerCase().includes(searchLower)
    )
  })

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '--';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <div>
      <div className='w-full space-y-10'>
        <div className='flex items-center justify-between'>
          <div className='relative w-full max-w-sm'>
            <HiOutlineSearch className='size-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600' />
            <InputText
              type="text"
              placeholder="Search logs..."
              className="pl-10 w-full max-w-sm"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-8">
            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
            <button
              className="ml-4 text-blue-500 hover:underline"
              onClick={fetchLogs}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className='overflow-auto rounded-xl border border-neutral-200/60'>
            <table className='min-w-full text-sm text-left'>
              <thead className='bg-neutral-50'>
                <tr>
                  <th className='p-4'><p>User ID</p></th>
                  <th className='p-4'><p>Name</p></th>
                  <th className='p-4'><p>Role</p></th>
                  <th className='p-4'><p>Program</p></th>
                  <th className='p-4'><p>Log Type</p></th>
                  <th className='p-4'><p>Timestamp</p></th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <tr key={log._id} className='border-t border-neutral-200/70'>
                      <td className='p-4'>{log.userID || '--'}</td>
                      <td className='p-4'>{log.name || '--'}</td>
                      <td className='p-4'>
                        <span className={`px-2 py-1 rounded-full text-xs ${log.role === 'Student' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                          {log.role === 'Student' ? 'Student' : 'Faculty'}
                        </span>
                      </td>
                      <td className='p-4'>{log.program || '--'}</td>
                      <td className='p-4'>
                        <span className={`px-2 py-1 rounded-full text-xs ${log.logType === 'login' ? 'bg-green-100 text-green-800' :
                          log.logType === 'logout' ? 'bg-orange-100 text-orange-800' :
                            log.logType === 'borrow' ? 'bg-blue-100 text-blue-800' :
                              log.logType === 'return' ? 'bg-amber-100 text-amber-800' :
                                'bg-gray-100 text-gray-800'
                          }`}>
                          {log.logType?.charAt(0).toUpperCase() + log.logType?.slice(1) || 'Unknown'}
                        </span>
                      </td>
                      <td className='p-4'>{formatDate(log.createdAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-4 text-center text-gray-500">
                      {search ? 'No logs match your search.' : 'No activity logs found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ActivityLog