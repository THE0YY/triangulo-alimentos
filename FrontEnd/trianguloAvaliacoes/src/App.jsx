import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "./pages/Principal"
import Login from "./pages/Login"
import AvaliarProduto from "./pages/AvaliarProduto"
import AvaliarSetor from "./pages/AvaliarSetor"
import Menu from "./pages/Menu";

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/"                     element={<Menu/>}/>
        <Route path="/avaliar-produto"      element={<AvaliarProduto/>}/>
        <Route path="/avaliar-setor"        element={<AvaliarSetor/>}/>
        <Route path="/login"                element={<Login/>}/>
        <Route path="/principal"            element={<Principal/>}/>
      </Routes>
    </BrowserRouter>
  )
}