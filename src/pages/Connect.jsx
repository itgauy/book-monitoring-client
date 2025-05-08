import React from 'react'
import { Button } from '../components'
import Swal from 'sweetalert2'

const Connect = () => {

  const handleSuccessModal = () => {
    Swal.fire({
      icon: 'success',
      iconColor: "#22c55e",
      title: "Connected Succesfully",
      text: "Connection established. You can now explore the system.",
      confirmButtonText: 'Got it',
      customClass: {
        title: "swal-title",
        text: "swal-text",
        popup: "swal-popup-sm",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel"
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
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='w-full max-w-xs border border-neutral-200 shadow-xl shadow-neutral-200/30 p-6 rounded-2xl space-y-5'>
        <h5>Connection</h5>
        {/*  */}
        <div>
          <label>Connection</label>
          <select id="swal-connect" class="swal-input w-full">
            <option value=""></option>
            <option value="COM5">COM5</option>
          </select>
        </div>
        <Button variant='primary' onClick={handleSuccessModal} className='mt-8 w-full'>
          Connect
        </Button>
      </div>
    </div>
  )
}

export default Connect
