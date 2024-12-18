/**
 * @author Arthur Jezequel
 */

import {CardFull} from "./containers/CardFull.tsx";
import {CardRow} from "./containers/CardRow.tsx";
import {fetchCard} from "../../api/cardService.ts";
import {useEffect, useState} from "react";
import ICard from "../../types/ICard.ts";

enum CardDisplay {
    FULL = "full",
    ROW = "row",
}

interface IProps {
    display: string;
    cardId: number;
}

/**
 * Main component for representing a Card.
 * @param props Props containing :
 * - The display method : 'full' or 'row'
 * - The card's id
 * @constructor
 */
export const Card=(props:IProps) => {
    const [card, setCard] = useState<any | null>(null);

    useEffect(() => {
        const loadCard = async (): Promise<void> => {
            try {
                const fetchedCard: ICard = await fetchCard(props.cardId);
                setCard(fetchedCard);
            } catch (err: any) {
                console.log(err);
            }
        };
        loadCard();
    }, [props.cardId]);

    if (props.cardId === -1){
        return (
            <div></div>
        )
    }

    // Needed since while the card is beeing fetched, this is set to null. underlying components
    // will throw nullpointer exception is they try to work with this null card.
    if (!card) {
        return <div>Loading...</div>;
    }

    let result;

    switch (props.display) {
        case CardDisplay.FULL:
            result = (<CardFull card={card} />)
            break;
        case CardDisplay.ROW:
            result = (<CardRow card={card} />)
            break;
        default:
            break;
    }
    return result;
}