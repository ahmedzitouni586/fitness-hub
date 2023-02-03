import React from 'react'

import Login from '../componenets/Register/Login'

const SignIn = ({isLoggedIn, setIsLoggedIn}) => {
  return (
    <div style={{color: 'white', background: '#000', display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'cenetr', minHeight: '100vh'}}>
      <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    </div>
  )
}

export default SignIn