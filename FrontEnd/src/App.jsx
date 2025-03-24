import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { Landing } from './pages/landing';
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext';
import React from 'react';
import VideoMeetComponent from './pages/videoMeet';
import { Toaster } from 'react-hot-toast'


function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>

            {/* <Route  path="/home" element={}/> */}
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path='/:url' element={<VideoMeetComponent />} />
          </Routes>
        </AuthProvider>
        <Toaster
          position="bottom-left"
          reverseOrder={false}
        />
      </BrowserRouter>
    </>
  )
}

export default App


