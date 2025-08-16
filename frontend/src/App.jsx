import {useState} from 'react'
import {BrowserRouter as Router, Routes ,Route,BrowserRouter} from "react-router-dom"
import Home from './pages/Home';
import Upload from './pages/Upload';
function App(){
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element ={<Home/>}></Route>
      <Route path='/upload' element ={<Upload/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App