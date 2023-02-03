import React from 'react'
import SignUp from '../componenets/Register/SignUp'

const Register = () => {
  return (
    <div style={{color: 'white', background: '#000', display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'cenetr', minHeight: '100vh'}}>
      <SignUp/>
    </div>
  )
}

export default Register
