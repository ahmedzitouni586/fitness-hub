import React from 'react'

const ControlsDelete = ({deleteAllMeals}) => {
  return (
    <div className='controls-delete'>
      <button className='btn-delete-all' onClick={()=> deleteAllMeals()}>Delete All</button>
    </div>
  )
}

export default ControlsDelete
