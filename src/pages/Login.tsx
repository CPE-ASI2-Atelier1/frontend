/**
 * @author Evann Nalewajek
 */

import React, { useState } from "react";
import { login } from "../api/userService";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        try {
            const response = await login(username, password);

            if (response) {
                console.log("Utilisateur trouvé !");
            }
        } catch (error: any) {
            setError("Nom d'utilisateur ou mot de passe incorrect !");
            console.error(error);
        }
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
        </div>
    );
};