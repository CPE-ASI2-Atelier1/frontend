/**
 * @author Arthur Jezequel
 */

import ICard from "../types/ICard.ts"

/**
 * Method to fetch a card from the backend
 * @param cardId Id of the card to fetch
 * @return Promise A promise for the response as an ICard object
 */
export const fetchCard = async (cardId: number) : Promise<ICard> => {
    const url: string= `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`
    const response = await fetch(`${url}/card/${cardId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch card : ${response.statusText}`);
    }
    return await response.json();
}