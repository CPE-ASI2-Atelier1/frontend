import './App.css';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import {CardDisplay} from "./pages/CardDisplay";
import { User } from "./components/Login/containers/User";
import {Home} from "./pages/Home.tsx";
import { Login } from "./pages/Login.tsx";
import { Signup } from "./pages/Signup";
import { Profil } from "./pages/Profil";



function App() {

  const { submitted_user } = useSelector((state: RootState) => state.user);
    let user_login;
    if (submitted_user.id == -1) {
      user_login = (<NavLink to="/login">Se connecter</NavLink>)
    }
    else {
      user_login = (<NavLink to="/profil"
                    style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }}>
                    <User user={submitted_user} display="short" />
                    </NavLink>)
    }
    return (
        <>
            <BrowserRouter>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/display">Display</NavLink>
                {user_login}
                <Routes>
                    <Route path="/display" element={<CardDisplay/>} />
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profil" element={<Profil />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
