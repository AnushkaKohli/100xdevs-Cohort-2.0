import { useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../config'

const Signin = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div>
            <input onChange={(e) => setUsername(e.target.value)} type='text' placeholder='username' />
            <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='password' />
            <button onClick={async () => {
                await axios.post(`${BACKEND_URL}/signin`, {
                    username,
                    password
                }, {
                    // withCredentials true because this is cross site
                    withCredentials: true,
                });
                alert("You are logged in")
            }}>Submit</button>
        </div>
    )
}

export default Signin
