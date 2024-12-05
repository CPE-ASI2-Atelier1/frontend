import './App.css';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {CardDisplay} from "./pages/CardDisplay";
import {Home} from "./pages/Home.tsx";



function App() {
    return (
        <>
            <BrowserRouter>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/display">Display</NavLink>
                <Routes>
                    <Route path="/display" element={<CardDisplay/>} />
                    <Route path="/" element={<Home/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
