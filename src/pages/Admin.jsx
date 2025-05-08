import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import UserData from './UserData'
import BookData from './BookData'
import ActivityLog from './ActivityLog'
import { HiLogout, HiOutlineClipboard, HiOutlineUser, HiOutlineBookOpen, HiOutlineBookmarkAlt } from "react-icons/hi"
import { Button } from '../components'

const Admin = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false)
  const location = useLocation()
  const [isNavOpen, setIsNavOpen] = useState(false)

  const handleLogout = () => {
    Swal.fire({
      icon: "warning",
      iconColor: "#ef4444",
      title: "Are you sure?",
      text: "You will be logged out of your account",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out",
      cancelButtonText: "Cancel",
      customClass: {
        title: "swal-title",
        text: "swal-text",
        popup: "swal-popup-sm",
        confirmButton: "swal-danger",
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

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen)
  }

  const renderComponent = () => {
    switch (location.pathname) {
      case '/admin/userdata':
        return <UserData />
      case '/admin/bookdata':
        return <BookData />
      case '/admin/log':
        return <ActivityLog />
      default:
        return <UserData />
    }
  }

  const ButtonLink = ({ link, icon, label, isNavOpen }) => {
    return (
      <Link to={link} className='relative group'>
        <Button className={`justify-start w-full ease-in-out transition-all duration-300 gap-3 ${location.pathname === link ? 'border border-neutral-200 bg-neutral-200/40 text-neutral-600' : 'border-none text-neutral-700'} ${!isNavOpen ? 'size-11.5 rounded-xl' : 'rounded-lg'}`}>
          <span>{icon}</span>
          {label}
        </Button>
      </Link>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Side Nav */}
      <nav className={`z-50 lg:block hidden fixed p-3 h-screen w-56 transition-all duration-300`}>
        <div className='relative h-full flex flex-col justify-between'>
          <div>
            {/* Logo */}
            <div className='flex items-center gap-3'>
              <div className='flex items-center justify-center shrink-0 size-12 rounded-xl bg-neutral-800'>
                <HiOutlineBookmarkAlt className='size-8 text-neutral-300 stroke-[1px]' />
              </div>
              <h5>Hello</h5>
            </div>
            <ul className="mt-10 flex flex-col gap-2">
              {[
                { 'label': 'User Data', 'link': '/admin/userdata', 'icon': HiOutlineUser },
                { 'label': 'Book Data', 'link': '/admin/bookdata', 'icon': HiOutlineBookOpen },
                { 'label': 'Activity Log', 'link': '/admin/log', 'icon': HiOutlineClipboard }
              ].map((item, index) => (
                <ButtonLink
                  key={index}
                  link={item.link}
                  icon={<item.icon className={`size-6 ${location.pathname === item.link ? 'stroke-[1.7px] text-neutral-900' : 'stroke-[1.3px]'}`} />}
                  label={item.label}
                  isNavOpen={isNavOpen}
                >
                </ButtonLink>
              ))}
            </ul>
          </div>
          <div className='relative group'>
            <Button onClick={handleLogout} variant='danger' className={`w-full ${!isNavOpen ? 'size-11.5' : null}`}>
              <HiLogout className='size-5' />
              Logout
            </Button>
          </div>
        </div>
      </nav>
      {/* Content */}
      <main className={`w-full bg-neutral-50/40 pl-0 lg:pl-56 transition-all duration-300`}>
        <section className='py-3.5 pr-3.5 lg:pl-0 pl-3.5 bg-neutral-50/40 h-screen'>
          <div className='bg-white border border-neutral-200/60 rounded-3xl overflow-auto custom-scollbar lg:h-full h-[93%] lg:mt-0 mt-12 p-12'>
            {renderComponent()}
          </div>
        </section>
      </main>
    </motion.div>
  )
}

export default Admin