import React, {useState, useEffect} from 'react'
import './Tracker.css'
import ControlsCounter from './CalorieTracker/Controls/ControlsCounter';
import ControlsDelete from './CalorieTracker/Controls/ControlsDelete';
import ControlsInput from './CalorieTracker/Controls/ControlsInput'
import MealsList from './CalorieTracker/MealsList/MealsList';
import Modal from './CalorieTracker/Modal/Modal';

const Tracker = () => {

  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const addMealsHandler = () => {
    const oldMeals = [...meals];
    const meal = {
      mealName,
      calories,
      id: Math.floor(Math.random() * 1000)
    };

    const newMeals = oldMeals.concat(meal);

    if (calories <= 0 || mealName === "") {
      setOpenModal(true)
    } else {
      setMeals(newMeals);
      localStorage.setItem("meals", JSON.stringify(newMeals));
    }

    setMealName("");
    setCalories(0);
  }

  const deleteMealHandler = (id) => {
    const oldMeals = [...meals];
    const newMeals = oldMeals.filter((meal) => meal.id !== id);
    setMeals(newMeals);

    localStorage.setItem("meals", JSON.stringify(newMeals))
  }

  const deleteAllMeals = () => {
    setMeals([]);
    localStorage.clear();
  }

  const total = meals.map((meal) => meal.calories).reduce((acc, value) => acc + +value, 0)
  
  /*useEffect(()=> {
    const localStorageMeals = JSON.parse(localStorage.getItem('meals'));
    setMeals(localStorageMeals);
  }, [setMeals]);*/

  return (
    <section className='tracker-section'>
      <div className='tracker-container'>
        {openModal ? <Modal setOpenModal={setOpenModal}/> : ""}
        <h1 style={{marginBottom: "0", marginTop: "30px"}}>KEEP TRACKS OF YOUR CALORIES</h1>
        <ControlsCounter total={total}/>

        <ControlsInput 
          addMealsHandler={addMealsHandler} 
          mealName={mealName} 
          calories={calories}
          setMealName={setMealName}
          setCalories={setCalories}
        />
        <ControlsDelete deleteAllMeals={deleteAllMeals}/>
        
      </div>
        <div className='meals-container'>
          <MealsList meals={meals} deleteMealHandler={deleteMealHandler}/>
        </div>
    </section>
  )
}

export default Tracker
