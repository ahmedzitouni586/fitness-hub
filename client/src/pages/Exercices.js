import React from 'react'
import './Exercices.css'
import axios from '../api/axios';
import { useState } from 'react';

 

const Exercices = () => {

   const [search, setSearch] = useState([]);

   
  

   const handleChest = (e) => {
    e.preventDefault()
      axios.get('/exercises',
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }
      ).then((response) => {
        //console.log(response.data);
        const data = response.data.filter(item => item.muscle === 'chest')
        setSearch(data)
        //console.log(search)
      }).catch((error) => {
        console.log(error)
      });
   };
   const handleAbs = (e) => {
    e.preventDefault()
      axios.get('/exercises',
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }
      ).then((response) => {
        //console.log(response.data);
        const data = response.data.filter(item => item.muscle === 'abdominals')
        setSearch(data)
        //console.log(search)
      }).catch((error) => {
        console.log(error)
      });
   };

   const handleAbduct = (e) => {
    e.preventDefault()
      axios.get('/exercises',
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }
      ).then((response) => {
        //console.log(response.data);
        const data = response.data.filter(item => item.muscle === 'abductors')
        setSearch(data)
        //console.log(search)
      }).catch((error) => {
        console.log(error)
      });
   };

   const handleBiceps = (e) => {
    e.preventDefault()
      axios.get('/exercises',
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }
      ).then((response) => {
        //console.log(response.data);
        const data = response.data.filter(item => item.muscle === 'biceps')
        setSearch(data)
        //console.log(search)
      }).catch((error) => {
        console.log(error)
      });
   };

   const handleCalves = (e) => {
    e.preventDefault()
      axios.get('/exercises',
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }
      ).then((response) => {
        //console.log(response.data);
        const data = response.data.filter(item => item.muscle === 'calves')
        setSearch(data)
        //console.log(search)
      }).catch((error) => {
        console.log(error)
      });
   };

   const handleForearms = (e) => {
    e.preventDefault()
      axios.get('/exercises',
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }
      ).then((response) => {
        //console.log(response.data);
        const data = response.data.filter(item => item.muscle === 'forearms')
        setSearch(data)
        //console.log(search)
      }).catch((error) => {
        console.log(error)
      });
   };

   const handleGlutes = (e) => {
    e.preventDefault()
      axios.get('/exercises',
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }
      ).then((response) => {
        //console.log(response.data);
        const data = response.data.filter(item => item.muscle === 'glutes')
        setSearch(data)
        //console.log(search)
      }).catch((error) => {
        console.log(error)
      });
   };

   const handleHams = (e) => {
    e.preventDefault()
      axios.get('/exercises',
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }
      ).then((response) => {
        //console.log(response.data);
        const data = response.data.filter(item => item.muscle === 'hamstrings')
        setSearch(data)
        //console.log(search)
      }).catch((error) => {
        console.log(error)
      });
   };

   const handleLats = (e) => {
    e.preventDefault()
      axios.get('/exercises',
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }
      ).then((response) => {
        //console.log(response.data);
        const data = response.data.filter(item => item.muscle === 'lats')
        setSearch(data)
        //console.log(search)
      }).catch((error) => {
        console.log(error)
      });
   };

   const handleNeck = (e) => {
    e.preventDefault()
      axios.get('/exercises',
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }
      ).then((response) => {
        //console.log(response.data);
        const data = response.data.filter(item => item.muscle === 'neck')
        setSearch(data)
        //console.log(search)
      }).catch((error) => {
        console.log(error)
      });
   };

   const handleQuads = (e) => {
    e.preventDefault()
      axios.get('/exercises',
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }
      ).then((response) => {
        //console.log(response.data);
        const data = response.data.filter(item => item.muscle === 'quadriceps')
        setSearch(data)
        //console.log(search)
      }).catch((error) => {
        console.log(error)
      });
   };

   const handleTraps = (e) => {
    e.preventDefault()
      axios.get('/exercises',
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }
      ).then((response) => {
        //console.log(response.data);
        const data = response.data.filter(item => item.muscle === 'traps')
        setSearch(data)
        //console.log(search)
      }).catch((error) => {
        console.log(error)
      });
   };

   const handleTriceps = (e) => {
    e.preventDefault()
      axios.get('/exercises',
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }
      ).then((response) => {
        const data = response.data.filter(item => item.muscle === 'triceps')
        setSearch(data)
        
      }).catch((error) => {
        console.log(error)
      });
   };
  
  
  return (
    <section className='exercices-section'>
        <div className='exercices-container'>
          <h2>Awesome Exercises you<br/>Should Know</h2>
          <div className='btn-exercises'>
            <button onClick={handleChest}>Chest</button>
            <button onClick={handleAbs}>Abdominals</button>
            <button onClick={handleAbduct}>Abductors</button>
            <button onClick={handleBiceps}>Biceps</button>
            <button onClick={handleCalves}>Calves</button>
            <button onClick={handleForearms}>Forearms</button>
            <button onClick={handleGlutes}>Glutes</button>
            <button onClick={handleHams}>Hamstrings</button>
            <button onClick={handleLats}>Lats</button>
            <button onClick={handleNeck}>Neck</button>
            <button onClick={handleQuads}>Quadriceps</button>
            <button onClick={handleTraps}>Traps</button>
            <button onClick={handleTriceps}>Triceps</button>
          </div>
            
            {search.length > 0 && (
              <ul>
                {search.map(data => (
                <li key={data.id}>
                  <div className='exercise-card'>
                    <img width={'100%'} src={data.photo} alt={data.name}/>
                    <p>{data.name}</p>
                    <p>Equipment: {data.equipment}</p>
                    <p>Difficulty: {data.difficulty}</p>
                  </div>
                  
                </li>
                
                ))}
              </ul>
            )}
           
        </div>
    </section>
  )
}

export default Exercices
