import React from 'react'
import { Button, InputText } from '../components'
import { HiOutlineArrowRight, HiOutlineSearch, HiOutlineReply, HiOutlinePlusSm } from "react-icons/hi"

const UserData = () => {
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
          // onClick={handleAddUser}
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
                <th className='p-4'><p>Name</p></th>
                <th className='p-4'><p>Email</p></th>
                <th className='p-4'><p>Message</p></th>
                <th className='p-4'><p>Date</p></th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-t border-neutral-200/70 mx-12'>
                <td className='p-4'>hh</td>
                <td className='p-4'>hh</td>
                <td className='p-4'>hh</td>
                <td className='p-4'>hh</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/*  */}
      <div className='w-full max-w-md p-6 rounded-3xl border border-neutral-200 shadow-xl shadow-neutral-200/20 space-y-6'>
        <h5>User info</h5>
        <div className='flex items-center justify-center w-full'>
          {/* Profile */}
          <div className='relative size-40 rounded-full overflow-hidden ring-2 ring-offset-4 ring-neutral-200'>
            <img src='https://placehold.co/30x30' alt="Profile" className='absolute object-cover w-full h-full' />
          </div>
        </div>
        {/* Datas */}
        <div className='grid grid-cols-2 gap-x-2 gap-y-8 mt-12'>
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
          {/* Clearance */}
          <div>
            <span className='block font-semibold text-lg text-neutral-900'>Cleared</span>
            <span className='block text-neutral-500'>Clearance</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserData