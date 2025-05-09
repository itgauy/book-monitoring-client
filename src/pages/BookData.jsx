import React, { useState, useEffect } from 'react'
import { Button, InputText } from '../components'
import Swal from 'sweetalert2'
import axios from 'axios'
import { HiOutlineArrowRight, HiOutlineSearch, HiOutlineReply, HiOutlinePlusSm } from "react-icons/hi"

const API_URL = import.meta.env.VITE_API_URL

const BookData = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedBook, setSelectedBook] = useState(null)

  // Fetch all books
  const fetchBooks = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/books`)
      if (response.data && response.data.books) {
        setBooks(response.data.books)
      } else {
        throw new Error('Invalid response format')
      }
      setError(null)
    } catch (err) {
      console.error('Error fetching books:', err)
      setError('Failed to load books. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Get book details by ID
  const fetchBookDetails = async (bookID) => {
    try {
      const response = await axios.get(`${API_URL}/books/${bookID}`)
      if (response.data && response.data.book) {
        setSelectedBook(response.data.book)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      console.error('Error fetching book details:', err)
      Swal.fire({
        title: 'Error',
        text: 'Failed to load book details',
        icon: 'error',
        customClass: {
          popup: 'swal-popup-sm',
        }
      })
    }
  }

  // Handle selecting a book from the table
  const handleSelectBook = (book) => {
    setSelectedBook(book)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  // Filter books based on search
  const filteredBooks = books.filter(book => {
    if (!search) return true;
    const searchLower = search.toLowerCase()
    return (
      book.bookID?.toLowerCase().includes(searchLower) ||
      book.title?.toLowerCase().includes(searchLower) ||
      book.author?.toLowerCase().includes(searchLower) ||
      book.category?.toLowerCase().includes(searchLower) ||
      book.isbn?.toLowerCase().includes(searchLower)
    )
  })

  // Format publication date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Add Book
  const handleAddBook = () => {
    let formData = null;

    Swal.fire({
      title: 'Add New Book',
      html: `
      <div class="text-left grid grid-cols-2 gap-y-4 gap-x-6">
        <div>
          <label class="block text-sm mb-1 font-medium text-gray-700">Book ID</label>
          <input id="swal-bookid" class="swal-input w-full" placeholder="E.g. BK-0001">
        </div>
        <div>
          <label class="block text-sm mb-1 font-medium text-gray-700">ISBN</label>
          <input id="swal-isbn" class="swal-input w-full" placeholder="E.g. 978-3-16-148410-0">
        </div>
        <div>
          <label class="block text-sm mb-1 font-medium text-gray-700">Title</label>
          <input id="swal-title" class="swal-input w-full" placeholder="E.g. The Great Gatsby">
        </div>
        <div>
          <label class="block text-sm mb-1 font-medium text-gray-700">Author</label>
          <input id="swal-author" class="swal-input w-full" placeholder="E.g. F. Scott Fitzgerald">
        </div>
        <div>
          <label class="block text-sm mb-1 font-medium text-gray-700">Publication Year</label>
          <input id="swal-year" type="number" class="swal-input w-full" placeholder="E.g. 1925">
        </div>
        <div>
          <label class="block text-sm mb-1 font-medium text-gray-700">Category</label>
          <select id="swal-category" class="swal-input w-full">
            <option value="">Select Category</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Science">Science</option>
            <option value="Technology">Technology</option>
            <option value="History">History</option>
            <option value="Biography">Biography</option>
            <option value="Children">Children</option>
            <option value="Education">Education</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
          </select>
        </div>
        <div id="swal-validation-message" class="col-span-full text-center text-red-500 text-base"></div>
      </div>
    `,
      customClass: {
        title: "swal-title",
        text: "swal-text",
        popup: "swal-popup-6xl",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel"
      },
      showClass: {
        popup: 'swal-fade-in'
      },
      hideClass: {
        popup: 'swal-fade-out'
      },
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Add Book',
      preConfirm: () => {
        const bookId = document.getElementById('swal-bookid').value.trim()
        const isbn = document.getElementById('swal-isbn').value.trim()
        const title = document.getElementById('swal-title').value.trim()
        const author = document.getElementById('swal-author').value.trim()
        const year = document.getElementById('swal-year').value.trim()
        const category = document.getElementById('swal-category').value

        if (!bookId || !isbn || !title || !author || !year || !category) {
          document.getElementById('swal-validation-message').textContent = 'All fields are required.'
          return false
        }

        return { bookId, isbn, title, author, year: parseInt(year), category }
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        formData = result.value;

        let timerInterval
        Swal.fire({
          title: 'Scan the RFID',
          text: "Kindly scan the RFID to proceed",
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const timer = Swal.getPopup().querySelector("b")
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`
            }, 100)
          },
          customClass: {
            title: "swal-title",
            text: "swal-text",
            popup: "swal-popup-sm",
          },
          showClass: {
            popup: 'swal-fade-in'
          },
          hideClass: {
            popup: 'swal-fade-out'
          },
        }).then(async (rfidResult) => {
          clearInterval(timerInterval)

          if (rfidResult.dismiss === Swal.DismissReason.timer) {
            Swal.fire({
              title: 'Timeout',
              text: 'Book scanning timed out',
              icon: 'warning',
              customClass: {
                popup: 'swal-popup-sm',
              }
            })
            return
          }

          // Add the book to the database
          try {
            await axios.post(`${API_URL}/books`, {
              bookID: formData.bookId,
              isbn: formData.isbn,
              title: formData.title,
              author: formData.author,
              yearPub: formData.year,
              category: formData.category
            })

            // Refresh the books list
            fetchBooks()

            Swal.fire({
              title: 'Success!',
              text: 'Book has been added successfully.',
              icon: 'success',
              customClass: {
                popup: 'swal-popup-sm',
              }
            })
          } catch (err) {
            console.error('Error adding book:', err)
            Swal.fire({
              title: 'Error',
              text: err.response?.data?.message || 'Failed to add book. Please try again.',
              icon: 'error',
              customClass: {
                popup: 'swal-popup-sm',
              }
            })
          }
        })
      }
    })
  }

  return (
    <div className='flex gap-6'>
      {/*  */}
      <div className='w-full space-y-10'>
        <div className='flex items-center justify-between'>
          {/* Search Bar */}
          <div className='relative w-full max-w-sm'>
            <HiOutlineSearch className='size-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600' />
            <InputText
              type="text"
              placeholder="Search by ID, title, author..."
              className="pl-10 w-full max-w-sm"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          <Button
            variant='primary'
            onClick={handleAddBook}
          >
            Add Book
            <HiOutlinePlusSm className='size-5 stroke-2' />
          </Button>
        </div>

        {/* Loading/Error States */}
        {loading && (
          <div className="flex justify-center py-8">
            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}

        {error && !loading && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
            <button
              className="ml-4 text-blue-500 hover:underline"
              onClick={fetchBooks}
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
                  <th className='p-3'><p>Book ID</p></th>
                  <th className='p-3'><p>ISBN</p></th>
                  <th className='p-3'><p>Title</p></th>
                  <th className='p-3'><p>Author</p></th>
                  <th className='p-3'><p>Publication Year</p></th>
                  <th className='p-3'><p>Category</p></th>
                  <th className='p-3'><p>Status</p></th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <tr
                      key={book._id}
                      className={`border-t border-neutral-200/70 hover:bg-blue-50 cursor-pointer ${selectedBook?._id === book._id ? 'bg-blue-100' : ''}`}
                      onClick={() => handleSelectBook(book)}
                    >
                      <td className='p-3'>{book.bookID}</td>
                      <td className='p-3'>{book.isbn}</td>
                      <td className='p-3'>{book.title}</td>
                      <td className='p-3'>{book.author}</td>
                      <td className='p-3'>{book.yearPub}</td>
                      <td className='p-3'>{book.category}</td>
                      <td className='p-3'>
                        <span className={`px-2 py-1 rounded-full text-xs ${book.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                          {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-4 text-center text-gray-500">
                      {search ? 'No books match your search.' : 'No books found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Book Details Panel */}
      <div className='w-full max-w-md p-6 rounded-3xl border border-neutral-200 shadow-xl shadow-neutral-200/20 space-y-6'>
        {selectedBook ? (
          <>
            <div>
              <h5 className="text-lg font-bold">Book Info</h5>
              <span className='block leading-5 mt-1 text-gray-600'>
                Selected book: {selectedBook.bookID}
              </span>
            </div>
            {/* Data */}
            <div className='grid grid-cols-2 gap-x-2 gap-y-6 mt-8'>
              {/* Book ID */}
              <div>
                <span className='block font-semibold text-lg text-neutral-900'>{selectedBook.bookID}</span>
                <span className='block text-neutral-500'>Book ID</span>
              </div>
              {/* ISBN */}
              <div>
                <span className='block font-semibold text-lg text-neutral-900'>{selectedBook.isbn}</span>
                <span className='block text-neutral-500'>ISBN</span>
              </div>
              {/* Title */}
              <div>
                <span className='block font-semibold text-lg text-neutral-900'>{selectedBook.title}</span>
                <span className='block text-neutral-500'>Title</span>
              </div>
              {/* Author */}
              <div>
                <span className='block font-semibold text-lg text-neutral-900'>{selectedBook.author}</span>
                <span className='block text-neutral-500'>Author</span>
              </div>
              {/* Publication Year */}
              <div>
                <span className='block font-semibold text-lg text-neutral-900'>{selectedBook.yearPub}</span>
                <span className='block text-neutral-500'>Publication Year</span>
              </div>
              {/* Category */}
              <div>
                <span className='block font-semibold text-lg text-neutral-900'>{selectedBook.category}</span>
                <span className='block text-neutral-500'>Category</span>
              </div>
              {/* Status */}
              <div>
                <span className={`block font-semibold text-lg ${selectedBook.status === 'available'
                  ? 'text-green-700'
                  : 'text-amber-700'
                  }`}>
                  {selectedBook.status === 'available' ? 'Available' : 'Borrowed'}
                </span>
                <span className='block text-neutral-500'>Status</span>
              </div>

              {/* Current Borrower Info (if borrowed) */}
              {selectedBook.status === 'borrowed' && selectedBook.currentBorrower && selectedBook.currentBorrower.borrowerID && (
                <div className='col-span-full border border-neutral-200 bg-neutral-50/80 rounded-xl px-4 py-3'>
                  <span className='block text-neutral-700'>Current Borrower:
                    <span className='text-neutral-900 text-lg font-semibold ml-1'>{selectedBook.currentBorrower.borrowerID}</span>
                  </span>

                  {selectedBook.currentBorrower.dateBorrowed && (
                    <span className='block text-neutral-700'>Date Borrowed:
                      <span className='text-neutral-900 ml-1'>{formatDate(selectedBook.currentBorrower.dateBorrowed)}</span>
                    </span>
                  )}

                  {selectedBook.currentBorrower.dueDate && (
                    <span className='block text-neutral-700'>Due date:
                      <span className={`ml-1 ${new Date(selectedBook.currentBorrower.dueDate) < new Date()
                        ? 'text-red-600 text-lg font-semibold'
                        : 'text-neutral-900'
                        }`}>
                        {formatDate(selectedBook.currentBorrower.dueDate)}
                      </span>
                    </span>
                  )}

                  {selectedBook.currentBorrower.dueDate && new Date(selectedBook.currentBorrower.dueDate) < new Date() && (
                    <span className='block mt-1 font-medium text-red-600'>
                      ⚠️ Overdue by {Math.floor((new Date() - new Date(selectedBook.currentBorrower.dueDate)) / (1000 * 60 * 60 * 24))} days
                    </span>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <HiOutlineSearch className="w-12 h-12 text-gray-300 mb-4" />
            <h5 className="text-lg font-medium mb-2">Book info</h5>
            <span className='block leading-5 text-gray-500'>
              Click on a book from the table to view information.
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookData