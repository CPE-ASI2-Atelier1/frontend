import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { setPassword, setConfirmPassword } from "../slices/authSlice";
import { update_user_action, submit_user_action } from "../slices/userSlice";
import { IUser } from "../components/Login/containers/User";

export const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { password, confirmPassword, passwordMatch } = useSelector((state: RootState) => state.auth);

    const [username, setUsername] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!username.trim()) {
            alert("Le nom d'utilisateur est requis !");
            return;
        }

        if (!passwordMatch) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }

        const user: IUser = {
            id: Date.now(),
            username,
            password,
            money: 0,
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
                    <label htmlFor="username">Nom d'utilisateur :</label><br />
                    <input
                        type="text"
                        id="username"
                        name="username"
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
                <button type="submit">
                    Créer un compte
                </button>
            </form>
        </div>
    );
};
