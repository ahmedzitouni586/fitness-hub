import React, { useState } from 'react'
import './Calorie.css'


const BMR_CALCULATOR_CONSTANT = 10;



const BmrCalculator = () => {

  const [bmr, setBmr] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('');
  const [tdee, setTdee] = useState();

  const calculateBmr = () => {

    let bmrValue = 0;
    if (gender === 'male') {
      bmrValue = BMR_CALCULATOR_CONSTANT* weight + 6.25 * height - 5 * age + 5;
    } else {
      bmrValue = BMR_CALCULATOR_CONSTANT* weight + 6.25 * height - 5 * age - 161;
    }
    setBmr(bmrValue);
  }

  const calculateTdee = () => {
    calculateBmr()
    
    setTimeout(() => {
      let tdeeValue = 0;
    if (activity === 'sedentary') {
      tdeeValue = bmr * 1.2;
    }
    else if (activity === 'light active') {
      tdeeValue = bmr * 1.375;
    }
    else if (activity === 'moderately active') {
      tdeeValue = bmr * 1.55;
    }
    else if (activity === 'very active') {
      tdeeValue = bmr * 1.725
    }
    else if (activity === 'extremly active') {
      tdeeValue = bmr * 1.9
    }
      setTdee(tdeeValue);
    }, 2000)
    
  }

  return (
    <section className='bmr-section'>
      <div className='bmrCalculator-container'>
      <div className='input-element'>
        <label htmlFor="weight">Weight (kg):</label><br/>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={e => setWeight(e.target.value)}
        />
      </div>
      <div className='input-element'>
        <label htmlFor="height">Height (cm):</label><br/>
        <input
          type="number"
          id="height"
          value={height}
          onChange={e => setHeight(e.target.value)}
        />
      </div>
      <div className='input-element'>
        <label htmlFor="age">Age:</label><br/>
        <input
          type="number"
          id="age"
          value={age}
          onChange={e => setAge(e.target.value)}
        />
      </div>
      <div className='input-element'>
        <label htmlFor="gender">Gender:</label><br/>
        <select id="gender" value={gender} onChange = {e => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className='input-element'>
        <label htmlFor="avtivity">Activites:</label><br/>
        <select id="avtivity" value={activity} onChange = {e => setActivity(e.target.value)}>
          <option value="sedentary">Sedentary (little or no exercicse)</option>
          <option value="light active">Light active (sports 1-3 days a week)</option>
          <option value="moderately active">Moderately active (sports 3-5 days a week)</option>
          <option value="very active">Very active (sports 6-7 days a week)</option>
          <option value="extremly active">Extremly active (training 2 times a day)</option>
        </select>
      </div>
      <button onClick={calculateTdee}>Calculate</button>
      <div className='bmr-result'>
        Your BMR is: {bmr}
      </div>
      <div className='bmr-result'>
        Your TDEE is: {tdee}
      </div>
    </div>

    
    </section>
    
  )
}

export default BmrCalculator
