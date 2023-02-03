import React, {useState} from 'react'
import First from '../Workout/loseWeight/first'
import Second from '../Workout/loseWeight/Second'

const LoseWeight = () => {
    const [phase, setPhase] = useState("first")
  return (
    <div className='workout-container'>
      <div className='weeks'>
        <button className='week-btn' onClick={() => setPhase("first")}>Phase One</button>
        <button className='week-btn' onClick={() => setPhase("second")}>Phase Two</button>
        
        </div>
          {phase === "first" && <First />}
          {phase === "second" && <Second />}
          

        

        
      </div> 
  )
}

export default LoseWeight
