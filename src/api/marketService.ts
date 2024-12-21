/**
 * @author Thibault BERTHET
 */

import ICard from "../types/ICard.ts"

/**
 * Method to fetch all cards from the backend monolith DB
 * @return Promise A promise for the response as a list of ICard objects
 */

let base_url: string;
const dev: string = `${import.meta.env.VITE_ENV}`
if (dev === "DEV") {
    base_url = `${import.meta.env.VITE_MONOLITH_URL}`
} else {
    base_url = ""
}

export const fetchCards = async () : Promise<ICard[]> => {
    const response = await fetch(`${base_url}/cards`);
    if (!response.ok) {
        throw new Error(`Failed to fetch cards : ${response.statusText}`);
    }
    return await response.json();
}

export const buyCard = async (user_id : number, card_id : number) : Promise<boolean> => {
    const url : string = `${base_url}/store/buy`
    try {
        const response = await fetch(url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({user_id, card_id}),
            });

        if (!response.ok) {
            throw new Error("La carte " + card_id + " n'a pas pu être achetée pour le user " + user_id);
        }
        console.log("The HTTP request to buy a card has been sent to the monolith.")
        return true;
    }
        catch (error) {
            console.error(error);
            return false;
    }
}