import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Catalogue from './pages/Catalogue/Catalogue'
import AddBook from './pages/AddBook/AddBook'
import Collections from './pages/Collections/Collections'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/catalogue" element={<Catalogue/>}/>
        <Route path="/collections" element={<Collections/>}/>
        <Route path="/add-book" element={<AddBook/>}/>
      </Routes>
    </BrowserRouter>
  )
}