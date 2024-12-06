import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setPassword, setConfirmPassword } from '../slices/authSlice.ts';

export const Signup = () => {
    const dispatch = useDispatch();
    const { password, confirmPassword, passwordMatch } = useSelector((state: RootState) => state.auth);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!passwordMatch) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }
        console.log("Compte créé avec succès !");
    };

    return (
        <div>
            <h1>Créer un compte</h1>
            <form onSubmit={handleSubmit}>
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
