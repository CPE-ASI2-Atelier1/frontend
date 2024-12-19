/**
 * @author Arthur Jezequel
 */

import ICard from "../types/ICard.ts"

const url: string= `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`
const WIPurl: string= `${import.meta.env.VITE_API_HOST}:8081`


/**
 * Method to fetch a card from the backend
 * @param cardId Id of the card to fetch
 * @return Promise A promise for the response as an ICard object
 */
export const fetchCard = async (cardId: number) : Promise<ICard> => {
    const response = await fetch(`${url}/card/${cardId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch card : ${response.statusText}`);
    }
    return await response.json();
}

export const addCard = async (card: ICard): Promise<ICard> => {
    if (card.id != null && card.id != 0) {
        card.id = 0
    }
    console.log("Request sent to create wip card with id : "+card.id);
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(card)
    }
    const response = await fetch(`${url}/card`, config)
    //const response = await fetch(`${WIPurl}/updateWIP`, config)
    if (!response.ok) {
        throw new Error(`Failed to add card : ${response.statusText}`);
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
        const response = await fetch(`${WIPurl}/deleteWIP`, config);
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

export const fetchWIPCard = async (cardId: number) : Promise<ICard> => {
    // A changer : env, et envoyer au proxy.....
    const response = await fetch(`http://localhost:8081/WipCard/${cardId}`);
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
    const response = await fetch(`http://localhost:8081/Props`, config);
    if (!response.ok) {
        throw new Error(`Failed to generate props : ${response.statusText}`);
    }
    return await response.json();
}