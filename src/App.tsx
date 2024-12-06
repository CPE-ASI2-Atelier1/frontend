import './App.css';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {CardDisplay} from "./pages/CardDisplay";
import {Home} from "./pages/Home.tsx";
import {Inventory} from "./pages/Inventory.tsx";



function App() {
    return (
        <>
            <BrowserRouter>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/display">Display</NavLink>
                <NavLink to="/inventory">Inventory</NavLink>
                <Routes>
                    <Route path="/display" element={<CardDisplay/>} />
                    <Route path="/inventory" element={<Inventory/>} />
                    <Route path="/" element={<Home/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
