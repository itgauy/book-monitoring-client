import React from 'react'
import { Button, InputText } from '../components'
import Swal from 'sweetalert2'
import { HiOutlineArrowRight, HiOutlineSearch, HiOutlineReply, HiOutlinePlusSm } from "react-icons/hi"

const ActivityLog = () => {
  return (
    <div>
      <div className='w-full space-y-10'>
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
        {/* Table */}
        <div className='overflow-auto rounded-xl border border-neutral-200/60'>
          <table className='min-w-full text-sm text-left'>
            <thead className='bg-neutral-50'>
              <tr>
                <th className='p-4'><p>User ID</p></th>
                <th className='p-4'><p>Name</p></th>
                <th className='p-4'><p>Gender</p></th>
                <th className='p-4'><p>Role</p></th>
                <th className='p-4'><p>Program</p></th>
                <th className='p-4'><p>Contact Number</p></th>
                <th className='p-4'><p>Clearance</p></th>
                <th className='p-4'><p>Timestamp</p></th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-t border-neutral-200/70 mx-12'>
                <td className='p-4'>22-2808</td>
                <td className='p-4'>Lian T. Villanueva</td>
                <td className='p-4'>Male</td>
                <td className='p-4'>Student</td>
                <td className='p-4'>BSIT</td>
                <td className='p-4'>0912358719</td>
                <td className='p-4'>Cleared</td>
                <td className='p-4'>--</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ActivityLog