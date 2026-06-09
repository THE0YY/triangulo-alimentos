import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "./pages/Principal"
import Login from "./pages/Login"
import Avaliar from "./pages/Avaliar"

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/avaliar" element={<Avaliar/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/principal" element={<Principal/>}/>
      </Routes>
    </BrowserRouter>
  )
}