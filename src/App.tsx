/**
 * @author Arthur Jezequel
 * @author Evann Nalewajek
 */

import './App.css';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { RootState } from "./store";
import { User } from "./components/Login/containers/User";
import {Home} from "./pages/Home.tsx";
import {Market} from "./pages/Market.tsx";
import {Inventory} from "./pages/Inventory.tsx";
import { Login } from "./pages/Login.tsx";
import { Signup } from "./pages/Signup";
import {CardCreation} from "./pages/CardCreation.tsx";
import {MyCreations} from "./pages/MyCreations.tsx";
import { Profil } from "./pages/Profil";
import { Game } from "./pages/Game";
import { logout_user_action, submit_user_action } from "./slices/userSlice";
import Cookies from 'js-cookie';
import { fetchUserById } from "./api/userService";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let { submitted_user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const userId = Cookies.get('user');
    if (userId) {
      fetchUserById(parseInt(userId))
        .then(user => {
          // Mettre à jour l'utilisateur dans Redux
          dispatch(submit_user_action({ user }));
          setIsAuthenticated(true);
          console.log("Utilisateur mis dans les cookies :", user);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération de l\'utilisateur', error);
          setIsAuthenticated(false);
        });
    } else {
      setIsAuthenticated(false);
    }
  }, [dispatch]);
  console.log("Valeur de submitted_user :", submitted_user);
  
  const handleLogout = () => {
    dispatch(logout_user_action());
    window.location.replace("/");
  };
  return (
      <>
          <BrowserRouter>
              <header>
                  {/* Barre de navigation */}
                  <nav>
                      {submitted_user && isAuthenticated ? (
                          <>
                              <NavLink to="/create" className={({ isActive }) => (isActive ? "isActive" : "")}>
                                  New card
                              </NavLink>
                              <NavLink to="/creations" className={({ isActive }) => (isActive ? "isActive" : "")}>
                                  My Creations
                              </NavLink>
                              <NavLink to="/inventory" className={({ isActive }) => (isActive ? "isActive" : "")}>
                                  Inventory
                              </NavLink>
                              <NavLink to="/market" className={({ isActive }) => (isActive ? "isActive" : "")}>
                                  Market
                              </NavLink>
                              <NavLink to="/game" className={({ isActive }) => (isActive ? "isActive" : "")}>  
                                  Play Game    
                              </NavLink>
                              <NavLink to="/profil" className={({ isActive }) => (isActive ? "isActive" : "")}>
                                  <User user={submitted_user} display="short" />
                              </NavLink>
                              <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
                                  Log Out
                              </button>
                          </>
                      ) : (
                          <>
                              <NavLink to="/" className={({ isActive }) => (isActive ? "isActive" : "")}>
                                Home
                              </NavLink>
                              <NavLink to="/login" className={({ isActive }) => (isActive ? "isActive" : "")}>
                                  Sign In
                              </NavLink>
                              <NavLink to="/signup" className={({ isActive }) => (isActive ? "isActive" : "")}>
                                  Sign Up
                              </NavLink>
                          </>
                      )}
                  </nav>
              </header>


              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/inventory" element={<Inventory isWip={false}/>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/create" element={<CardCreation />} />
                  <Route path="/creations" element={<MyCreations />} />
                  <Route path="/profil" element={<Profil />} />
                  <Route path="/market" element={<Market />} />
                  <Route path="/game" element={<Game />} />
              </Routes>
          </BrowserRouter>
      </>
  )
}

export default App
