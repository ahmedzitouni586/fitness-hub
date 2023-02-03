import React from 'react'

const Modal = ({setOpenModal}) => {
  return (
    <div className='modal'>
      <p>Calories Must Be Bigger Than 0 And Meal Name Cannot Be Blank</p>
      <button className='btn-close-modal' onClick={() => setOpenModal(false)}>Close</button>
    </div>
  )
}

export default Modal
