import Image from "next/image";
import axios from 'axios';

async function getUserDetails () {
  // Simulate a slow API call
  await new Promise(resolve => setTimeout(resolve, 5000));
  const response = await axios.get('http://localhost:3000/api/user');
  // const response = await axios.get('https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details');
  return response.data;
}

export default async function Home () {
  const userData = await getUserDetails();
  return (
    <div>
      Hello World!
      <div className="flex flex-col justify-center mt-8">
        <div className="flex justify-center">
          <div className="border p-8 rounded">
            <div>
              Name: {userData?.name}
            </div>

            {userData?.email}
          </div>
        </div>
      </div>
    </div>
  );
}
