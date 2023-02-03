import React from 'react'

const MealsList = ({meals, deleteMealHandler}) => {


  return (
    <div className='meals-container-wrapper'>
      {meals.map((meal, index) => (
        <div key={index} className='meals-container-inner'>
            <div>{`${meal.mealName} : ${meal.calories}`}</div>
            <div>
                <button className='btn-delete-meal' onClick={() => deleteMealHandler(meal.id)}>Delete</button>
            </div>
        </div>
        
      ))}
    </div>
  )
}

export default MealsList
