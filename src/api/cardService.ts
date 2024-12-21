/**
 * @author Arthur Jezequel
 */

import ICard from "../types/ICard.ts"

let url: string;
const dev: string = `${import.meta.env.VITE_ENV}`
if (dev === "DEV") {
    url = `${import.meta.env.VITE_MONOLITH_URL}`
} else {
    url = ""
}

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
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(card)
    }
    const response = await fetch(`${url}/card`, config)
    if (!response.ok) {
        throw new Error(`Failed to add card : ${response.statusText}`);
    }
    return await response.json();
}

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