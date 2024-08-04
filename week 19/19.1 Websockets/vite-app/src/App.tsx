import { useEffect, useState } from 'react';
import './App.css'

function App () {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string>();
  const [latestMessage, setLatestMessage] = useState<string>('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('Connection established');
      setSocket(socket);
    }

    socket.onmessage = (message) => {
      setMessages(message.data);
      console.log('Message received:', message.data);
    }

    // return () => socket.close();

  }, [])

  if (!socket) {
    return <div>Connecting to the socket server...</div>
  }

  return (
    <div className='flex flex-col items-center justify-center gap-y-8'>
      <p className='text-2xl font-semibold'>Messages</p>
      <div className='flex items-center justify-between gap-x-4'>
        <input type='text' placeholder='Type a message...' onChange={(event) => setLatestMessage(event.target.value)} />
        <button onClick={() => socket.send(latestMessage)} className='border px-8 py-2 rounded-xl'>Send</button>
      </div>
      <div>{messages}</div>
    </div>
  )
}

export default App
