import IUser from "../types/IUser";

/**
 * Méthode pour authentifier un utilisateur via le backend
 * @param username Nom d'utilisateur
 * @param password Mot de passe
 * @returns Promise Une promesse contenant l'ID de l'utilisateur
 */
export const login = async (username: string, password: string): Promise<number> => {
    const url: string = 'http://tp.cpe.fr:8083/auth';

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

    // Si le backend retourne l'ID directement
    if (typeof result === "number") {
        return result; // ID de l'utilisateur trouvé
    }

    throw new Error("Utilisateur non trouvé ou réponse inattendue !");
};

export const fetchUserById = async (userId: number): Promise<IUser> => {
    const url = `http://tp.cpe.fr:8083/user/${userId}`;

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