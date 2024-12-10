/**
 * @author Evann Nalewajek
 */

import React, { useState } from "react";
import { login, fetchUserById } from "../api/userService";
import { useDispatch } from "react-redux";
import { update_user_action, submit_user_action } from "../slices/userSlice";
import { NavLink, useNavigate } from "react-router-dom";
import IUser from "../types/IUser";

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

            console.log("Utilisateur connecté :", user);
        } catch (error: any) {
            setError("Nom d'utilisateur ou mot de passe incorrect !");
            console.error("Erreur :", error);
        }
        navigate("/");
    };

    return (
        <div>
            <h1>Se connecter</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Nom d'utilisateur :</label><br />
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe :</label><br />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Se connecter</button>
            </form>
            <p>
                Vous n'avez pas de compte ? <NavLink to="/signup">Créer un compte</NavLink>
            </p>
        </div>
    );
};
