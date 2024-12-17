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
import styles from "./signup.module.css";

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
            alert("All the fields are required");
            return;
        }

        if (!passwordMatch) {
            alert("The passwords provided aren't the same");
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

            // Redirection vers la page du profile
            navigate("/profil");
        } catch (error: any) {
            setError("Erreur lors de l'inscription : " + error.message);
            console.error(error);
        }
    };

    return (
        <div className={styles["signup-container"]}>
            <div className={styles["signup-card"]}>
                <h1>Créer un compte</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles["input-container"]}>
                        <label htmlFor="login">Username :</label>
                        <input
                            type="text"
                            id="login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="surName">Name :</label>
                        <input
                            type="text"
                            id="surName"
                            value={surName}
                            onChange={(e) => setSurName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="lastName">Surname :</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="email">Email :</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="password">Password :</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => dispatch(setPassword(e.target.value))}
                            required
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="confirmPassword">Confirm password :</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
                            required
                        />
                    </div>
                    {!passwordMatch && (
                        <p className={styles["error-message"]}>The passords provided aren't the same</p>
                    )}
                    {error && <p className={styles["error-global"]}>{error}</p>}
                    <button type="submit" className={styles["signup-button"]}>
                        Create an account
                    </button>
                </form>
            </div>
        </div>
    );
};
