/**
 * @author Thibault Berthet
 */

import ICard from "../types/ICard.ts"

export const fetchWIPCards = async (userId: number) : Promise<ICard[]> => {
    // A changer : env, et envoyer au proxy.....
    const response = await fetch(`http://localhost:8081/wipCards/${userId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch WIP card : ${response.statusText}`);
    }
    return await response.json();
}