import React from 'react'

const ControlsCounter = ({total}) => {
  return (
    <div className='controls-counter'>
      <h2>Total Calories: <span>{total}</span></h2>
    </div>
  )
}

export default ControlsCounter
