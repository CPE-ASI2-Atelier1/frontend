/**
 * @author Arthur Jezequel
 */

import ICard from "../types/ICard.ts"

//const url: string= `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`
const url: string = `${import.meta.env.VITE_MONOLITH_URL}`

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