/**
 * @author Arthur Jezequel
 * @author Evann Nalewajek
 */

import './App.css';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import {CardDisplay} from "./pages/CardDisplay";
import { User } from "./components/Login/containers/User";
import {Home} from "./pages/Home.tsx";
import {Inventory} from "./pages/Inventory.tsx";
import { Login } from "./pages/Login.tsx";
import { Signup } from "./pages/Signup";
import {CardCreation} from "./pages/CardCreation.tsx";
import { Profil } from "./pages/Profil";
import { logout_user_action } from "./slices/userSlice";

function App() {

  const { submitted_user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout_user_action());
    window.location.reload();
  };
  // let user_login;
  // console.log('App current user : ', submitted_user);
  // if (submitted_user == null) {
  //   user_login = (<NavLink to="/login">Se connecter</NavLink>)
  // }
  // else {
  // user_login = (<>
  //                 <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
  //                   Se déconnecter
  //                 </button>
  //                 <NavLink to="/profil"
  //                   style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }}>
  //                     <User user={submitted_user} display="short" />
  //                 </NavLink>
  //                 <NavLink to="/display">Display</NavLink>
  //                 <NavLink to="/inventory">Inventory</NavLink>
  //                 <NavLink to="/create">CreateCard</NavLink>
  //               </>)
  // }
  return (
      <>
          <BrowserRouter>
              <header>
                  {/* Barre de navigation */}
                  <nav style={{ display: "flex", alignItems: "center", gap: "15px", padding: "10px", borderBottom: "1px solid #ccc" }}>
                      <NavLink to="/" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}>
                          Home
                      </NavLink>

                      {submitted_user ? (
                          <>
                              <NavLink to="/display" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}>
                                  Display
                              </NavLink>
                              <NavLink to="/inventory" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}>
                                  Inventory
                              </NavLink>
                              <NavLink to="/create" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}>
                                  CreateCard
                              </NavLink>
                              <NavLink to="/profil" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }}>
                                  <User user={submitted_user} display="short" />
                              </NavLink>
                              <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
                                  Se déconnecter
                              </button>
                          </>
                      ) : (
                          <>
                              <NavLink to="/login" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}>
                                  Se connecter
                              </NavLink>
                              <NavLink to="/signup" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}>
                                  S'inscrire
                              </NavLink>
                          </>
                      )}
                  </nav>
              </header>

              {/* Routes */}
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/display" element={<CardDisplay />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/create" element={<CardCreation />} />
                  <Route path="/profil" element={<Profil />} />
              </Routes>
          </BrowserRouter>
      </>
  )
}

export default App
