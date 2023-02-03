import React from 'react'

const ControlsInput = ({
  addMealsHandler, 
  calories, 
  mealName,
  setMealName,
  setCalories
}) => {

  const onAddMealsClick = () => {
    addMealsHandler();
  }

  return (
    <div className='controls'>
      <div className='controls-input'>
        <input
            type="text"
            placeholder="Meal"
            value={mealName}  
            onChange={(e) => setMealName(e.target.value)} 
        />
        <input
            type="number"
            placeholder="calories" 
            value={calories}
            onChange={(e) => setCalories(e.target.value)} 
            min={0}
        />
        <button onClick={onAddMealsClick}>Add Meal</button>
      </div>
    </div>
  )
}

export default ControlsInput
