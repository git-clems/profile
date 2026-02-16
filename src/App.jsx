import { useState } from 'react'
import './App.css'
import AppBar from './components/appbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Projects from './pages/projects'
import About from './pages/about'
import Details from './pages/detail'
import Contact from './pages/contact'
import { FooterBar } from './components/footerbar'

function App() {

  return (
    <>
      <AppBar></AppBar>
      <Routes>
        <Route path='' element = {<Home></Home>}></Route>
        <Route path='projects' element = {<Projects></Projects>}></Route>
        <Route path='about-me' element = {<About></About>}></Route>
        <Route path='projects/:id' element = {<Details></Details>}></Route>
        <Route path='contact' element = {<Contact></Contact>}></Route>
      </Routes>
      <FooterBar></FooterBar>
    </>
  )
}

export default App
