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
    </div>
  )
}

export default ActivityLog