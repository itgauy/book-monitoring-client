import React from 'react'
import { Button, InputText } from '../components'
import Swal from 'sweetalert2'
import { HiOutlineArrowRight, HiOutlineSearch, HiOutlineReply, HiOutlinePlusSm } from "react-icons/hi"

const UserData = () => {

  // Add User 
  const handleAddUser = () => {
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
        <div>
          <label class="block text-sm mb-1 font-medium text-gray-700">Clearance</label>
          <select id="swal-clearance" class="swal-input w-full">
            <option value="">Select Clearance</option>
            <option value="Cleared">Cleared</option>
            <option value="Not Cleared">Not Cleared</option>
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
        const userId = document.getElementById('swal-userid').value.trim()
        const name = document.getElementById('swal-name').value.trim()
        const gender = document.getElementById('swal-gender').value
        const role = document.getElementById('swal-role').value
        const program = document.getElementById('swal-program').value
        const contact = document.getElementById('swal-contact').value.trim()
        const clearance = document.getElementById('swal-clearance').value

        if (!userId || !name || !gender || !role || !program || !contact || !clearance) {
          document.getElementById('swal-validation-message').textContent = 'All fields are required.'
          return false
        }

        return { userId, name, gender, role, program, contact, clearance }
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
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
        })

      }
    })
  }

  // Borrow Book
  const handleBorrowBook = () => {
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
            onClick={handleAddUser}
          >
            Add User
            <HiOutlinePlusSm className='size-5 stroke-2' />
          </Button>
        </div>
        {/* Table */}
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
                <th className='p-3'><p>Clearance</p></th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-t border-neutral-200/70 mx-12'>
                <td className='p-3'>22-2808</td>
                <td className='p-3'>Lian T. Villanueva</td>
                <td className='p-3'>Male</td>
                <td className='p-3'>Student</td>
                <td className='p-3'>BSIT</td>
                <td className='p-3'>0912358719</td>
                <td className='p-3'>Cleared</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/*  */}
      <div className='w-full max-w-md p-6 rounded-3xl border border-neutral-200 shadow-xl shadow-neutral-200/20 space-y-6'>
        <div>
          <h5>User info</h5>
          <span className='block leading-5 mt-1'>Search or scan the library card <br />  to view user info.</span>
        </div>
        <div className='flex items-center justify-center w-full mt-2'>
          {/* Profile */}
          <div className='flex items-center justify-center bg-neutral-800 size-24 rounded-full overflow-hidden ring-2 ring-offset-4 ring-neutral-300'>
            <span className='text-4xl font-bold text-white'>LT</span>
          </div>
        </div>
        {/* Datas */}
        <div className='grid grid-cols-2 gap-x-2 gap-y-6 mt-8'>
          {/* userID */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>22-2808</span>
            <span className='block text-neutral-500'>User ID</span>
          </div>
          {/* Name */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>Lian T. Villanueva</span>
            <span className='block text-neutral-500'>Name</span>
          </div>
          {/* Gender */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>Male</span>
            <span className='block text-neutral-500'>Gender</span>
          </div>
          {/* Role */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>Student</span>
            <span className='block text-neutral-500'>Role</span>
          </div>
          {/* Program */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>BSIT</span>
            <span className='block text-neutral-500'>Program</span>
          </div>
          {/* Contact Number */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>0912358719</span>
            <span className='block text-neutral-500'>Contact Number</span>
          </div>
          {/* Status */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>Active</span>
            <span className='block text-neutral-500'>Status</span>
          </div>
          {/* Clearance */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>Cleared</span>
            <span className='block text-neutral-500'>Clearance</span>
          </div>
          {/* Borrowed Books */}
          <div className='col-span-full border border-neutral-200 bg-neutral-50/80 rounded-xl px-4 py-3'>
            <span className='block text-neutral-700'>Book Name: <span className='text-neutral-900 text-lg font-semibold'>Hell of fire</span></span>
            <span className='block text-neutral-700'>Date to be returned: <span className='text-neutral-900 text-lg font-semibold'>05/09/2025</span></span>
            <span className='block text-neutral-700'>Past due date: <span className='text-red-600 text-lg font-semibold'>05/09/2025</span></span>
          </div>
        </div>
        <div className='flex justify-end'>
          <Button
            variant='primary'
            onClick={handleBorrowBook}
          >
            Borrow a book
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UserData