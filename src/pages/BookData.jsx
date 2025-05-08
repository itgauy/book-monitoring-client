import React from 'react'
import { Button, InputText } from '../components'
import Swal from 'sweetalert2'
import { HiOutlineArrowRight, HiOutlineSearch, HiOutlineReply, HiOutlinePlusSm } from "react-icons/hi"

const BookData = () => {

  // Add Book
  const handleAddBook = () => {
    Swal.fire({
      title: 'Add New User',
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
          <input id="swal-year" type="date" class="swal-input w-full">
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
        <div>
          <label class="block text-sm mb-1 font-medium text-gray-700">Status</label>
          <select id="swal-status" class="swal-input w-full">
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Borrowed">Borrowed</option>
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
      confirmButtonText: 'Add User',
      preConfirm: () => {
        const bookId = document.getElementById('swal-bookid').value.trim()
        const isbn = document.getElementById('swal-isbn').value.trim()
        const title = document.getElementById('swal-title').value.trim()
        const author = document.getElementById('swal-author').value.trim()
        const year = document.getElementById('swal-year').value
        const category = document.getElementById('swal-category').value
        const status = document.getElementById('swal-status').value

        if (!bookId || !isbn || !title || !author || !year || !category || !status) {
          document.getElementById('swal-validation-message').textContent = 'All fields are required.'
          return false
        }

        return { bookId, isbn, title, author, year, category, status }
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        let timerInterval
        Swal.fire({
          title: 'Scan the Book',
          text: "Kindly scan the Book to proceed",
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
              placeholder="Search..."
              className="pl-10 w-full max-w-sm"
            // onChange={(e) => setSearch(e.target.value)}
            // value={search}
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
        {/* Table */}
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
              <tr className='border-t border-neutral-200/70 mx-12'>
                <td className='p-3'>22-2808</td>
                <td className='p-3'>123123123</td>
                <td className='p-3'>Hello of lire</td>
                <td className='p-3'>Lian V. Torres</td>
                <td className='p-3'>02/12/2005</td>
                <td className='p-3'>Science Fiction</td>
                <td className='p-3'>Borrowed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/*  */}
      <div className='w-full max-w-md p-6 rounded-3xl border border-neutral-200 shadow-xl shadow-neutral-200/20 space-y-6'>
        <div>
          <h5>Book info</h5>
          <span className='block leading-5 mt-1'>Search or tap the back of the <br />book  to view book info.</span>
        </div>
        {/* Datas */}
        <div className='grid grid-cols-2 gap-x-2 gap-y-6 mt-8'>
          {/* Book ID */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>22-2808</span>
            <span className='block text-neutral-500'>Book ID</span>
          </div>
          {/* ISBN */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>123123123</span>
            <span className='block text-neutral-500'>ISBN</span>
          </div>
          {/* Title */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>Hello of lire</span>
            <span className='block text-neutral-500'>Title</span>
          </div>
          {/* Author */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>Lian V. Torres</span>
            <span className='block text-neutral-500'>Author</span>
          </div>
          {/* Publication Year */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>02/12/2005</span>
            <span className='block text-neutral-500'>Publication Year</span>
          </div>
          {/* Category */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>Science Fiction</span>
            <span className='block text-neutral-500'>Category</span>
          </div>
          {/* Status */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>Borrowed</span>
            <span className='block text-neutral-500'>Status</span>
          </div>
          {/* Borrowed Books */}
          <div className='col-span-full border border-neutral-200 bg-neutral-50/80 rounded-xl px-4 py-3'>
            <span className='block text-neutral-700'>Current Borrower: <span className='text-neutral-900 text-lg font-semibold'>Frederick Moreno</span></span>
            <span className='block text-neutral-700'>Date Borrowed: <span className='text-neutral-900 text-lg font-semibold'>05/09/2025</span></span>
            <span className='block text-neutral-700'>Due date: <span className='text-red-600 text-lg font-semibold'>05/09/2025</span></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookData