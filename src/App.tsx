import './App.css';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {CardDisplay} from "./pages/CardDisplay";
import {Home} from "./pages/Home.tsx";
import {Inventory} from "./pages/Inventory.tsx";
import { Login } from "./pages/Login.tsx";
import { Signup } from "./pages/Signup";



function App() {
    return (
        <>
            <BrowserRouter>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/display">Display</NavLink>
                <NavLink to="/inventory">Inventory</NavLink>
                <NavLink to="/login">Se connecter</NavLink>
                <Routes>
                    <Route path="/display" element={<CardDisplay/>} />
                    <Route path="/inventory" element={<Inventory/>} />
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
