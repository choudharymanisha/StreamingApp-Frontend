import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VideoUpload from './Components/VideoUpload'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)
  const[videoId,setVideoId] = useState("1bf1f5fd-141a-4320-b31b-0d78fb3ddcd5",)

  return (
    <>
    <Toaster/>
    <div  className="flex flex-col items-center space-y-5 justify-center py-9">
      <h1 className= "text-2xl font-bold text-gray-700 dark:text-gray-100">  Video Streaming Application</h1>
      <div className='flex mt-14 w-full justify-around'>
      <div>
        <h1 className='text-white'> Playing Video in straimg app </h1>
        <video
        style = {{
          width:500,
          height:500,
        }}
        src = {`http://localhost:8080/api/v1/videos/stream/range/${videoId}`} controls
        />
      </div>
      
      <VideoUpload/>
      </div>
      </div>
    </>
  )
}

export default App
