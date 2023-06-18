import React from 'react'
import './App.css'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Article from './pages/Article.jsx'
import Posting from './pages/Posting.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "@fontsource/montserrat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/login' Component={Login} />
        <Route path='/posting' Component={Posting} />
        <Route path='/article/:topic_name/:sequence_number' Component={Article} />
        <Route path='/signup' Component={Signup} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;