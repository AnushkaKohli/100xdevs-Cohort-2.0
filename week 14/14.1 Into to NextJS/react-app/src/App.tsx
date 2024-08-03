import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App () {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    address: {
      "city": "",
      "state": "",
      "houseNumber": ""
    }
  });

  useEffect(() => {
    async function getUserDetails () {
      const response = await axios.get('https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details');
      setLoading(false);
      console.log(response.data);
      setData(response.data);
    }

    getUserDetails();
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col justify-center h-screen main-box card">
      <div><span className='key'>Name:</span> {data?.name}</div>
      <div><span className='key'>Email:</span> {data?.email}</div>
      <div><span className='key'>State:</span> {data?.address.state}</div>
      <div><span className='key'>City:</span> {data?.address.city}</div>
      <div><span className='key'>House Number:</span> {data?.address.houseNumber}</div>
    </div>
  )
}

export default App
