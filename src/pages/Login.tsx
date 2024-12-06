import React from "react";
import { NavLink } from "react-router-dom";

export const Login = () => {
    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Authentification en cours...");
    };

    return (
        <div>
            <h1>Se connecter</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Nom :</label><br />
                    <input type="text" id="username" name="username" required/>
                </div>
                <div>
                    <label htmlFor="password">Mot de passe :</label><br />
                    <input type="password" id="password" name="password" required/>
                </div>
                <button type="submit">Se connecter</button>
            </form>
            <p>
                Vous n'avez pas de compte ? <NavLink to="/signup">Créer un compte</NavLink>
            </p>
        </div>
    );
};
