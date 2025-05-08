import React, { useState, useEffect } from 'react'
import { Button, InputText } from '../components'
import Swal from 'sweetalert2'
import axios from 'axios'
import { HiOutlineArrowRight, HiOutlineSearch, HiOutlineReply, HiOutlinePlusSm } from "react-icons/hi"

const API_URL = import.meta.env.VITE_API_URL

const UserData = () => {
  const [borrowers, setBorrowers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedBorrower, setSelectedBorrower] = useState(null)

  // Fetch all borrowers
  const fetchBorrowers = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/borrowers`)
      if (response.data && response.data.borrowers) {
        setBorrowers(response.data.borrowers)
      } else {
        throw new Error('Invalid response format')
      }
      setError(null)
    } catch (err) {
      console.error('Error fetching borrowers:', err)
      setError('Failed to load borrowers. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Fetch borrower's books
  const fetchBorrowerBooks = async (userID) => {
    try {
      const response = await axios.get(`${API_URL}/borrowers/${userID}/books`)
      if (response.data && response.data.books) {
        return response.data.books
      }
      return []
    } catch (err) {
      console.error('Error fetching borrower books:', err)
      return []
    }
  }

  // Handle borrower selection
  // Modify handleSelectBorrower function
  const handleSelectBorrower = async (borrower) => {
    try {
      const books = await fetchBorrowerBooks(borrower.userID)

      // Check if any books are past due
      const hasPastDueBooks = books.some(bookItem => {
        const borrowDetails = bookItem.borrowDetails || {}
        return (
          borrowDetails.dueDate &&
          !borrowDetails.returned &&
          new Date(borrowDetails.dueDate) < new Date()
        )
      })

      // Update clearance status if there are past due books
      let updatedBorrower = { ...borrower }
      if (hasPastDueBooks) {
        updatedBorrower.isCleared = false

        // Update in the database if needed
        try {
          await axios.patch(`${API_URL}/borrowers/${borrower.userID}`, {
            isCleared: false
          })
        } catch (err) {
          console.warn('Failed to update borrower clearance status:', err)
          // Continue anyway as we've updated locally
        }
      }

      setSelectedBorrower({
        ...updatedBorrower,
        books
      })
    } catch (err) {
      console.error('Error selecting borrower:', err)
    }
  }

  useEffect(() => {
    fetchBorrowers()
  }, [])

  // Filter borrowers based on search
  const filteredBorrowers = borrowers.filter(borrower => {
    if (!search) return true;
    const searchLower = search.toLowerCase()
    return (
      borrower.userID?.toLowerCase().includes(searchLower) ||
      borrower.name?.toLowerCase().includes(searchLower) ||
      borrower.program?.toLowerCase().includes(searchLower) ||
      borrower.role?.toLowerCase().includes(searchLower)
    )
  })

  // Format initials for avatar
  const getInitials = (name) => {
    if (!name) return 'NA'
    return name.split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  // Format clearance status
  const formatClearance = (isCleared) => {
    if (isCleared === true || isCleared === "true" || isCleared === "Cleared") {
      return "Cleared"
    } else {
      return "Not Cleared"
    }
  }

  // Add User 
  const handleAddUser = () => {
    // Store form values outside the modal chain
    let formData = null;

    Swal.fire({
      title: 'Add New User',
      html: `
    <div class="text-left grid grid-cols-2 gap-y-4 gap-x-6">
      <div>
        <label class="block text-sm mb-1 font-medium text-gray-700">User ID</label>
        <input id="swal-userid" class="swal-input w-full" placeholder="E.g. 12-3456">
      </div>
      <div>
        <label class="block text-sm mb-1 font-medium text-gray-700">Name</label>
        <input id="swal-name" class="swal-input w-full" placeholder="E.g. Juan Dela Cruz">
      </div>
      <div>
        <label class="block text-sm mb-1 font-medium text-gray-700">Gender</label>
        <select id="swal-gender" class="swal-input w-full">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div>
        <label class="block text-sm mb-1 font-medium text-gray-700">Role</label>
        <select id="swal-role" class="swal-input w-full">
          <option value="">Select Role</option>
          <option value="Student">Student</option>
          <option value="Faculty">Faculty</option>
        </select>
      </div>
      <div>
        <label class="block text-sm mb-1 font-medium text-gray-700">Program</label>
        <select id="swal-program" class="swal-input w-full">
          <option value="">Select Program</option>
          <option value="BSIT">BSIT</option>
          <option value="BSCS">BSCS</option>
          <option value="BSIS">BSIS</option>
        </select>
      </div>
      <div>
        <label class="block text-sm mb-1 font-medium text-gray-700">Contact Number</label>
        <input id="swal-contact" class="swal-input w-full" placeholder="E.g. 09123456789">
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
      confirmButtonText: 'Add User',
      preConfirm: () => {
        const userId = document.getElementById('swal-userid').value.trim()
        const name = document.getElementById('swal-name').value.trim()
        const gender = document.getElementById('swal-gender').value
        const role = document.getElementById('swal-role').value
        const program = document.getElementById('swal-program').value
        const contact = document.getElementById('swal-contact').value.trim()

        if (!userId || !name || !gender || !role || !program || !contact) {
          document.getElementById('swal-validation-message').textContent = 'All fields are required.'
          return false
        }

        return { userId, name, gender, role, program, contact }
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        // Store the form data so we can use it after RFID scan
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
              text: 'RFID scanning timed out',
              icon: 'warning',
              customClass: {
                popup: 'swal-popup-sm',
              }
            })
            return
          }

          try {
            await axios.post(`${API_URL}/borrowers/register`, {
              userID: formData.userId,
              name: formData.name,
              gender: formData.gender,
              role: formData.role,
              program: formData.program,
              contactNumber: formData.contact,
              isCleared: true,
              status: 'active'
            })

            // Refresh the borrowers list
            fetchBorrowers()

            Swal.fire({
              title: 'Success!',
              text: 'User has been added successfully.',
              icon: 'success',
              customClass: {
                popup: 'swal-popup-sm',
              }
            })
          } catch (err) {
            console.error('Error adding user:', err)
            Swal.fire({
              title: 'Error',
              text: err.response?.data?.message || 'Failed to add user. Please try again.',
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

  // Borrow Book
  const handleBorrowBook = () => {
    if (!selectedBorrower) {
      Swal.fire({
        title: 'Error',
        text: 'Please select a user first',
        icon: 'error',
        customClass: {
          popup: 'swal-popup-sm',
        }
      })
      return
    }

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
    }).then((result) => {
      clearInterval(timerInterval)
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
              placeholder="Search..."
              className="pl-10 w-full max-w-sm"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          <Button
            variant='primary'
            onClick={handleAddUser}
          >
            Add User
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
              onClick={fetchBorrowers}
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
                  <th className='p-3'><p>User ID</p></th>
                  <th className='p-3'><p>Name</p></th>
                  <th className='p-3'><p>Gender</p></th>
                  <th className='p-3'><p>Role</p></th>
                  <th className='p-3'><p>Program</p></th>
                  <th className='p-3'><p>Contact Number</p></th>
                  <th className='p-4'><p>Clearance</p></th>
                </tr>
              </thead>
              <tbody>
                {filteredBorrowers.length > 0 ? (
                  filteredBorrowers.map((borrower) => (
                    <tr
                      key={borrower._id}
                      className={`border-t border-neutral-200/70 hover:bg-blue-50 cursor-pointer ${selectedBorrower?._id === borrower._id ? 'bg-blue-100' : ''}`}
                      onClick={() => handleSelectBorrower(borrower)}
                    >
                      <td className='p-3'>{borrower.userID}</td>
                      <td className='p-3'>{borrower.name}</td>
                      <td className='p-3'>{borrower.gender}</td>
                      <td className='p-3'>{borrower.role}</td>
                      <td className='p-3'>{borrower.program}</td>
                      <td className='p-3'>{borrower.contactNumber}</td>
                      <td className='p-3'>
                        <span className={`px-2 py-1 rounded-full text-xs ${borrower.isCleared === true || borrower.isCleared === "true" || borrower.clearance === "Cleared"
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                          }`}>
                          {formatClearance(borrower.isCleared || borrower.clearance)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-4 text-center text-gray-500">
                      {search ? 'No borrowers match your search.' : 'No borrowers found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Details Panel */}
      <div className='w-full max-w-md p-6 rounded-3xl border border-neutral-200 shadow-xl shadow-neutral-200/20 space-y-6'>
        {selectedBorrower ? (
          <>
            <div>
              <h5 className="text-lg font-bold">User Info</h5>
              <span className='block leading-5 mt-1 text-gray-600'>
                Selected user: {selectedBorrower.userID}
              </span>
            </div>
            <div className='flex items-center justify-center w-full mt-2'>
              {/* Profile */}
              <div className='flex items-center justify-center bg-neutral-800 size-24 rounded-full overflow-hidden ring-2 ring-offset-4 ring-neutral-300'>
                <span className='text-4xl font-bold text-white'>
                  {getInitials(selectedBorrower.name)}
                </span>
              </div>
            </div>
            {/* Data */}
            <div className='grid grid-cols-2 gap-x-2 gap-y-6 mt-8'>
              {/* userID */}
              <div>
                <span className='block font-semibold text-lg text-neutral-900'>{selectedBorrower.userID}</span>
                <span className='block text-neutral-500'>User ID</span>
              </div>
              {/* Name */}
              <div>
                <span className='block font-semibold text-lg text-neutral-900'>{selectedBorrower.name}</span>
                <span className='block text-neutral-500'>Name</span>
              </div>
              {/* Gender */}
              <div>
                <span className='block font-semibold text-lg text-neutral-900'>{selectedBorrower.gender}</span>
                <span className='block text-neutral-500'>Gender</span>
              </div>
              {/* Role */}
              <div>
                <span className='block font-semibold text-lg text-neutral-900'>{selectedBorrower.role}</span>
                <span className='block text-neutral-500'>Role</span>
              </div>
              {/* Program */}
              <div>
                <span className='block font-semibold text-lg text-neutral-900'>{selectedBorrower.program}</span>
                <span className='block text-neutral-500'>Program</span>
              </div>
              {/* Contact Number */}
              <div>
                <span className='block font-semibold text-lg text-neutral-900'>{selectedBorrower.contactNumber}</span>
                <span className='block text-neutral-500'>Contact Number</span>
              </div>
              {/* Clearance */}
              <div className='col-span-2'>
                <span className={`inline-block font-semibold text-lg px-3 py-1 rounded-full ${(selectedBorrower.isCleared === true || selectedBorrower.isCleared === "true" || selectedBorrower.clearance === "Cleared")
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                  }`}>
                  {formatClearance(selectedBorrower.isCleared || selectedBorrower.clearance)}
                </span>
                <span className='block text-neutral-500 mt-1'>Clearance</span>
              </div>

              {/* Borrowed Books */}
              {selectedBorrower.books && selectedBorrower.books.length > 0 ? (
                selectedBorrower.books.map((bookItem, index) => {
                  // Extract book and borrowDetails from the API response structure
                  const book = bookItem.book || {};
                  const borrowDetails = bookItem.borrowDetails || {};

                  return (
                    <div key={index} className='col-span-full border border-neutral-200 bg-neutral-50/80 rounded-xl px-4 py-3 mb-3'>
                      <span className='block text-neutral-700 mb-1'>Book Name:
                        <span className='text-neutral-900 text-lg font-semibold ml-1'>
                          {book.title || 'Untitled'}
                        </span>
                      </span>

                      {book.author && (
                        <span className='block text-neutral-700 mb-1'>Author:
                          <span className='text-neutral-900 ml-1'>{book.author}</span>
                        </span>
                      )}

                      {book.category && (
                        <span className='block text-neutral-700 mb-1'>Category:
                          <span className='text-neutral-900 ml-1'>{book.category}</span>
                        </span>
                      )}

                      <span className='block text-neutral-700 mb-1'>Book ID:
                        <span className='text-neutral-900 ml-1'>{book.bookID}</span>
                      </span>

                      <div className='mt-2 pt-2 border-t border-neutral-200'>
                        {borrowDetails.dateBorrowed && (
                          <span className='block text-neutral-700'>Date borrowed:
                            <span className='text-neutral-900 ml-1'>
                              {new Date(borrowDetails.dateBorrowed).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </span>
                        )}

                        {borrowDetails.dueDate && (
                          <span className='block text-neutral-700'>Due date:
                            <span className={`ml-1 ${new Date(borrowDetails.dueDate) < new Date() && !borrowDetails.returned ? 'text-red-600 font-semibold' : 'text-neutral-900'}`}>
                              {new Date(borrowDetails.dueDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </span>
                        )}

                        {borrowDetails.returned && (
                          <span className='block text-neutral-700'>Returned:
                            <span className='text-green-600 font-medium ml-1'>Yes</span>
                            {borrowDetails.dateReturned && (
                              <span className='text-neutral-700 ml-1'>on {new Date(borrowDetails.dateReturned).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}</span>
                            )}
                          </span>
                        )}

                        {!borrowDetails.returned && borrowDetails.dueDate && new Date(borrowDetails.dueDate) < new Date() && (
                          <span className='block mt-1 font-medium text-red-600'>
                            ⚠️ Overdue by {Math.floor((new Date() - new Date(borrowDetails.dueDate)) / (1000 * 60 * 60 * 24))} days
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className='col-span-full text-center py-4 text-gray-500'>
                  No books currently borrowed
                </div>
              )}
            </div>
            <div className='flex justify-end'>
              <Button
                variant='primary'
                onClick={handleBorrowBook}
              >
                Borrow a book
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <HiOutlineSearch className="w-12 h-12 text-gray-300 mb-4" />
            <h5 className="text-lg font-medium mb-2">User info</h5>
            <span className='block leading-5 text-gray-500'>
              Click on a user from the table to view their information.
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserData