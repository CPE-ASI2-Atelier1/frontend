/**
 * @author Evann Nalewajek
 */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { setPassword, setConfirmPassword } from "../slices/authSlice";
import { update_user_action, submit_user_action } from "../slices/userSlice";
import { register } from "../api/userService";

export interface formUser {
    login: string;
    pwd?: string;
    lastName: string;
    surName: string;
    email: string;
}
export const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { password, confirmPassword, passwordMatch } = useSelector((state: RootState) => state.auth);

    const [login, setLogin] = useState("");
    const [surName, setSurName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        if (!login.trim() || !surName.trim() || !lastName.trim() || !email.trim()) {
            alert("Tous les champs sont requis !");
            return;
        }

        if (!passwordMatch) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }

        const user: formUser = {
            login,
            pwd: password,
            surName,
            lastName,
            email,
        };

        try {
            const createdUser = await register(user);

            console.log("Utilisateur créé avec succès :", createdUser);

            // Mise à jour du store Redux avec le nouvel utilisateur
            dispatch(update_user_action({ user: createdUser }));
            dispatch(submit_user_action({ user: createdUser }));

            // Redirection vers la page d'accueil
            navigate("/");
        } catch (error: any) {
            setError("Erreur lors de l'inscription : " + error.message);
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Créer un compte</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="login">Nom d'utilisateur :</label><br />
                    <input
                        type="text"
                        id="login"
                        name="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="surName">Prénom :</label><br />
                    <input
                        type="text"
                        id="surName"
                        name="surName"
                        value={surName}
                        onChange={(e) => setSurName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Nom :</label><br />
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email :</label><br />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe :</label><br />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => dispatch(setPassword(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmez le mot de passe :</label><br />
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
                        required
                    />
                </div>
                {!passwordMatch && (
                    <p style={{ color: "red" }}>Les mots de passe ne correspondent pas !</p>
                )}
                <button type="submit">Créer un compte</button>
            </form>
        </div>
    );
};
