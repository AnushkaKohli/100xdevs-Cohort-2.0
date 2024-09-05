import { useState } from 'react'
import axios from 'axios'
import { Turnstile } from '@marsidev/react-turnstile'
import './App.css'

function App () {
  const [token, setToken] = useState<string>("")
  return (
    <>
      <input placeholder='OTP'></input>
      <input placeholder='New password'></input>

      <Turnstile
        onSuccess={(token) => {
          setToken(token)
        }}
        siteKey='0x4AAAAAAAizAk4s8hRdoq1M'
      />

      <button onClick={() => {
        axios.post("http://localhost:3000/reset-password", {
          email: "harkirat@gmail.com",
          otp: "123456",
          newPassword: "hellopassword",
          token: token,
        })
      }}>Update password</button>
    </>
  )
}

export default App
