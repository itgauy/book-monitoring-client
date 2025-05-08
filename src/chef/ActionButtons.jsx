import React from 'react'
import LogGen from './cake/LogGen'
import BorrowBook from './cake/BorrowBook'
import Delete from './cake/Delete'

const ActionButtons = () => {
  return (
    <>
      <LogGen />
      <BorrowBook />
      <Delete />
    </>
  )
}

export default ActionButtons