import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Catalogue from './pages/Catalogue/Catalogue'
import AddBook from './pages/AddBook/AddBook'
import Collections from './pages/Collections/Collections'
import Home from './pages/Home/Home'
import { Navbar } from './components/Navbar/Navbar'
import Login from './pages/Login/Login'
import { LoginManager } from './components/LoginManager/LoginManager'

export default function App() {  
  return (
    <LoginManager>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/catalogue" element={<Catalogue/>}/>
          <Route path="/collections" element={<Collections/>}/>
          <Route path="/add-book" element={<AddBook/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </LoginManager>
  )
}