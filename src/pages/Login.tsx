/**
 * @author Evann Nalewajek
 */

import "./login.module.css"
import React, { useState } from "react";
import { login, fetchUserById } from "../api/userService";
import { useDispatch } from "react-redux";
import { update_user_action, submit_user_action } from "../slices/userSlice";
import { NavLink, useNavigate } from "react-router-dom";
import IUser from "../types/IUser";
import styles from "./login.module.css";
import Cookies from 'js-cookie';

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        try {
            // Première requête : Authentification
            const userId = await login(username, password);
            console.log(`Utilisateur authentifié avec l'ID : ${userId}`);

            // Deuxième requête : Récupération des informations utilisateur
            const user: IUser = await fetchUserById(userId);
            console.log("Données utilisateur récupérées :", user);

            // Mise à jour du store Redux avec l'utilisateur
            dispatch(update_user_action({ user }));
            dispatch(submit_user_action({ user }));

            // Mise de l'id du user dans les cookies en tant que token
            // À terme le token sera généré par le serveur pour l'aspect sécuritaire
            Cookies.set('user', JSON.stringify(user.id), { expires: 7, path: '/' }); 

            console.log("Utilisateur connecté :", user);
        } catch (error: any) {
            setError("Nom d'utilisateur ou mot de passe incorrect !");
            console.error("Erreur :", error);
        }
        navigate("/profil");
    };

    return (
        <div className={styles["login-container"]}>
            <div className={styles["login-card"]}>
                <h1>log In</h1>
                <form onSubmit={handleLogin}>
                    <div className={styles["input-container"]}>
                        <label htmlFor="username">Username :</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="password">Password :</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className={styles["error-message"]}>{error}</p>}
                    <button type="submit" className={styles["login-button"]}>
                        Log In
                    </button>
                </form>
                <p className={styles["signup-link"]}>
                    You don't have an account ?{" "}
                    <NavLink to="/signup">Create an account</NavLink>
                </p>
            </div>
        </div>
    );
};
