/**
 * @author Thibault Berthet
 */

import ICard from "../types/ICard.ts"

const base_url: string= `${import.meta.env.VITE_SCHEDULER_URL}`

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