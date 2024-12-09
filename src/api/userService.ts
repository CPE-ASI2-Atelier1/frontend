/**
 * @author Evann Nalewajek
 */

import IUser from "../types/IUser";

interface LoginResponse {
    token: string;
    user: IUser;
}

/**
 * Method to fetch a user from the backend
 * @param login
 * @param pwd
 * @returns Promise A promise for the response as an IUser object
 */
export const login = async (login: string, pwd: string): Promise<LoginResponse> => {
    const url: string = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`;
    const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, pwd }),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to authenticate: ${response.statusText} - ${errorText}`);
    }
    return await response.json();
};
