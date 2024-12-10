/**
 * @author Evann Nalewajek
 */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { setPassword, setConfirmPassword } from "../slices/authSlice";
import { update_user_action, submit_user_action } from "../slices/userSlice";
import IUser from "../types/IUser";

export const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { password, confirmPassword, passwordMatch } = useSelector((state: RootState) => state.auth);

    const [login, setLogin] = useState("");
    const [surName, setSurName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!login.trim() || !surName.trim() || !lastName.trim() || !email.trim()) {
            alert("Tous les champs sont requis !");
            return;
        }

        if (!passwordMatch) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }

        const user: IUser = {
            id: Date.now(),
            login,
            pwd: password,
            account: 0,
            surName,
            lastName,
            email,
            cardList: [],
        };

        dispatch(update_user_action({ user }));
        dispatch(submit_user_action({ user }));

        console.log("Compte créé avec succès :", user);
        navigate("/");
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
