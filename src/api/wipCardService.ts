/**
 * @author Thibault Berthet
 */

import ICard from "../types/ICard.ts"

let base_url: string;
const dev: string = `${import.meta.env.VITE_ENV}`
if (dev === "DEV") {
    base_url = `${import.meta.env.VITE_SCHEDULER_URL}`
} else {
    base_url = ""
}

export const fetchWIPCards = async (userId: number) : Promise<ICard[]> => {
    // A changer : env, et envoyer au proxy.....
    const response = await fetch(`${base_url}/wipCards/${userId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch WIP card : ${response.statusText}`);
    }
    return await response.json();
}

export const fetchWIPCard = async (cardId: number) : Promise<ICard> => {
    // A changer : env, et envoyer au proxy.....
    const response = await fetch(`${base_url}/WipCard/${cardId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch WIP card : ${response.statusText}`);
    }
    return await response.json();
}

export const generateProperties = async (card:ICard): Promise<number> => {
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(card)
    }
    console.log(config.body)
    const response = await fetch(`${base_url}/Props`, config);
    if (!response.ok) {
        throw new Error(`Failed to generate props : ${response.statusText}`);
    }
    return await response.json();
}

export const delWipCard = async (id: number): Promise<void> => {
    console.log("Send request to delete wip card with id : " + id)
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Spécifie que le contenu est JSON
        },
        body: JSON.stringify(id), // Convertit l'entier en JSON
    };

    try {
        const response = await fetch(`${base_url}/deleteWIP`, config);
        if (!response.ok) {
            console.error("Response status:", response.status);
            console.error("Response text:", await response.text());
            throw new Error(`Failed to delete card: ${response.statusText}`);
        }

        console.log("Card deleted successfully.");
    } catch (error) {
        console.error("Unhandled error while deleting card:", error);
        throw error; // Propagation de l'erreur pour gestion en amont
    }
};