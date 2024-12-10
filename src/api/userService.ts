import IUser from "../types/IUser";
import { formUser } from "../pages/Signup"

const base_url: string= `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`

/**
 * Méthode pour authentifier un utilisateur via le backend
 * @param username Nom d'utilisateur
 * @param password Mot de passe
 * @returns Promise Une promesse contenant l'ID de l'utilisateur
 */
export const login = async (username: string, password: string): Promise<number> => {
    const url: string = base_url+"/auth";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error("Nom d'utilisateur ou mot de passe incorrect !");
    }

    const result = await response.json();

    if (typeof result === "number") {
        return result; // ID de l'utilisateur trouvé
    }

    throw new Error("Utilisateur non trouvé ou réponse inattendue !");
};

export const fetchUserById = async (userId: number): Promise<IUser> => {
    const url: string = base_url+"/user/"+userId;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Erreur lors de la récupération de l'utilisateur : ${response.statusText}`);
    }

    return await response.json();
};

export const register = async (user: formUser): Promise<IUser> => {
    const url: string = base_url+"/user";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error(`Erreur lors de l'inscription : ${response.statusText}`);
    }

    return await response.json();
};