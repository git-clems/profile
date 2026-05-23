import './App.css'
import AppBar from './components/appbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Projects from './pages/projects'
import About from './pages/about'
import Contact from './pages/contact'
import { FooterBar } from './components/footerbar'
import DetailsProject from './pages/detailProject'
import DetailsPublication from './pages/detailPaper'
import Papers from './pages/papers'
import ScrollToTop from './components/goTop'
import SmallBar from './components/smallBar'
import Admin from './features/admin'
import AdminContacts from './features/contactAdmin'
import ContactDetailAdmin from './features/contactDetailAdmin'
import Page404 from './pages/404'
function App() {

  return (
    <>
      <AppBar></AppBar>
      <SmallBar></SmallBar>
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path='' element={<Home></Home>}></Route>
        <Route path='/*' element={<Page404 />}></Route>
        <Route path='projects' element={<Projects></Projects>}></Route>
        <Route path='publications' element={<Papers></Papers>}></Route>
        <Route path='about-me' element={<About></About>}></Route>
        <Route path='projects/:id' element={<DetailsProject></DetailsProject>}></Route>
        <Route path='publications/:id' element={<DetailsPublication></DetailsPublication>}></Route>
        <Route path='contact' element={<Contact></Contact>}></Route>
        <Route path='admin' element={<Admin></Admin>}></Route>
        <Route path='admin/messagerie' element={<AdminContacts></AdminContacts>}></Route>
        <Route path='admin/messagerie/:id' element={<ContactDetailAdmin></ContactDetailAdmin>}></Route>
      </Routes>
      <FooterBar></FooterBar>
    </>
  )
}

export default App
