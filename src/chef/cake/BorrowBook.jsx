import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const BorrowBook = () => {
  const [borrowers, setBorrowers] = useState([])
  const [books, setBooks] = useState([])
  const [selectedUserID, setSelectedUserID] = useState('')
  const [selectedBookID, setSelectedBookID] = useState('')
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [bookDropdownOpen, setBookDropdownOpen] = useState(false)
  const [loading, setLoading] = useState({
    borrowers: false,
    books: false,
    submit: false
  })
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetchBorrowers()
    fetchBooks()
  }, [])

  const fetchBorrowers = async () => {
    setLoading(prev => ({ ...prev, borrowers: true }))
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
      setLoading(prev => ({ ...prev, borrowers: false }))
    }
  }

  const fetchBooks = async () => {
    setLoading(prev => ({ ...prev, books: true }))
    setError('')
    try {
      const response = await axios.get(`${API_URL}/books`)

      if (response.data && response.data.books) {
        // Only show available books
        const availableBooks = response.data.books.filter(book => book.status === 'available')
        setBooks(availableBooks)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      setError('Failed to load books. Please try again.')
      console.error('Error fetching books:', err)
    } finally {
      setLoading(prev => ({ ...prev, books: false }))
    }
  }

  const handleUserSelect = (userID) => {
    setSelectedUserID(userID)
    setUserDropdownOpen(false)
    setSuccessMessage('')
    setError('')
  }

  const handleBookSelect = (bookID) => {
    setSelectedBookID(bookID)
    setBookDropdownOpen(false)
    setSuccessMessage('')
    setError('')
  }

  const handleBorrowBook = async () => {
    if (!selectedUserID) {
      setError('Please select a user first')
      return
    }

    if (!selectedBookID) {
      setError('Please select a book to borrow')
      return
    }

    setLoading(prev => ({ ...prev, submit: true }))
    setError('')
    setSuccessMessage('')

    try {
      const response = await axios.post(`${API_URL}/borrowers/${selectedUserID}/borrow`, {
        bookID: selectedBookID
      })

      setSuccessMessage('Book borrowed successfully!')

      // Reset book selection and refresh books list
      setSelectedBookID('')
      fetchBooks()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to borrow book. Please try again.')
      console.error('Error borrowing book:', err)
    } finally {
      setLoading(prev => ({ ...prev, submit: false }))
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownOpen && !event.target.closest('.user-dropdown-container')) {
        setUserDropdownOpen(false)
      }
      if (bookDropdownOpen && !event.target.closest('.book-dropdown-container')) {
        setBookDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [userDropdownOpen, bookDropdownOpen])

  const getSelectedBorrowerName = () => {
    if (!selectedUserID) return '';
    const borrower = borrowers.find(b => b.userID === selectedUserID);
    return borrower ? borrower.name : '';
  }

  const getSelectedBookTitle = () => {
    if (!selectedBookID) return '';
    const book = books.find(b => b.bookID === selectedBookID);
    return book ? book.title : '';
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg shadow-md max-w-md mx-auto my-8">
      <h1 className="text-2xl font-bold text-center mb-6">Borrow a Book</h1>

      <div className="w-full space-y-6">
        {/* User Selection Dropdown */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select User:
          </label>
          <div className="user-dropdown-container relative w-full">
            <button
              type="button"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {selectedUserID ? `${selectedUserID} - ${getSelectedBorrowerName()}` : 'Select a user'}
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </button>

            {userDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {loading.borrowers ? (
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

        {/* Book Selection Dropdown */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Book:
          </label>
          <div className="book-dropdown-container relative w-full">
            <button
              type="button"
              onClick={() => setBookDropdownOpen(!bookDropdownOpen)}
              className="w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {selectedBookID ? `${selectedBookID} - ${getSelectedBookTitle()}` : 'Select a book'}
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </button>

            {bookDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {loading.books ? (
                  <div className="px-4 py-2 text-gray-500 flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading books...
                  </div>
                ) : books.length > 0 ? (
                  books.map((book) => (
                    <div
                      key={book.bookID}
                      onClick={() => handleBookSelect(book.bookID)}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {book.bookID} - {book.title} {book.author ? `(${book.author})` : ''}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">No available books found</div>
                )}
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="p-2 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <button
            onClick={handleBorrowBook}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
            disabled={!selectedUserID || !selectedBookID || loading.submit}
          >
            {loading.submit ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              'Borrow Book'
            )}
          </button>

          <div className="flex justify-between">
            <button
              onClick={fetchBorrowers}
              className="text-sm text-blue-500 hover:text-blue-700 py-2"
              disabled={loading.borrowers}
            >
              {loading.borrowers ? 'Loading...' : 'Refresh Users'}
            </button>

            <button
              onClick={fetchBooks}
              className="text-sm text-blue-500 hover:text-blue-700 py-2"
              disabled={loading.books}
            >
              {loading.books ? 'Loading...' : 'Refresh Books'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BorrowBook