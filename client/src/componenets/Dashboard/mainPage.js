import React, {useState} from 'react'
import './mainPage.css'
import BuildMuscle from './buildMuscle.js'
import PowerBuilding from './PowerBuilding'
import KeyTerms from './KeyTerms'
import LoseWeight from './LoseWeight'

const MainPage = () => {
    const [active, setActive] = useState("")
  return (
    
    <div className='dashboard-section'>
        <div className='dashboard-container'>
          <h1>BUILD YOUR PERFECT BODY</h1>
          <h3>Choose your goal</h3>
            <nav>
                <button onClick={() => setActive('buildMuscle')}>Build Muscle</button>
                <button onClick={() => setActive('loseWeight')}>Lose Weight</button>
                <button onClick={() => setActive('powerBuilding')}>Increase Strength</button>
            </nav>
            
        
        
           {active === 'buildMuscle' && <BuildMuscle/>}
           {active === 'loseWeight' && <LoseWeight />}
           {active === 'powerBuilding' && <PowerBuilding/>} 

        
        {active === 'buildMuscle' && <KeyTerms/>}
        
        {active === 'powerBuilding' && <KeyTerms/>}
        </div>
    </div>
    
  )
}

export default MainPage
