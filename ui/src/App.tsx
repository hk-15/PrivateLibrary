import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Catalogue from './pages/Catalogue/Catalogue'
import AddBook from './pages/AddBook/AddBook'
import Collections from './pages/Collections/Collections'
import Home from './pages/Home/Home'
import { Navbar } from './components/Navbar/Navbar'

export default function App() {

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/catalogue" element={<Catalogue/>}/>
        <Route path="/collections" element={<Collections/>}/>
        <Route path="/add-book" element={<AddBook/>}/>
      </Routes>
    </BrowserRouter>
  )
}