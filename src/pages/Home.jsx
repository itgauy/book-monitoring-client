import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>
      {/* Container */}
      <div className='flex flex-col items-cente justify-center border border-neutral-200 p-12 rounded-4xl w-full max-w-xl shadow-xl shadow-neutral-200/20'>
        <div className='flex flex-col justify-center items-center'>
          {/* Profile */}
          <div className='relative size-40 rounded-full overflow-hidden ring-2 ring-offset-4 ring-neutral-200'>
            <img src='https://placehold.co/30x30' alt="Profile" className='absolute object-cover w-full h-full' />
          </div>
          <h4 className='text-center mt-5'>Lian T. Villanueva</h4>
          <span className='text-neutral-800 text-xl text-center'>22-2807</span>
        </div>
        {/* Datas */}
        <div className='grid grid-cols-2 gap-x-2 gap-y-8 mt-10'>
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

export default Home