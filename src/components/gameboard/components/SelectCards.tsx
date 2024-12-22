import { useState } from "react";
import ICard from "../../../types/ICard";
import { Card } from "../../Card/Card";
import { CardTable } from "../../CardDisplay/containers/CardTable";
import "./SelectCards.css";

interface IProps {
    cardIds: number[];
    cardsAreSelected: (cards: number[]) => void;
}

export const SelectCards = (props:IProps) => {
    const [localSelectedCards, setLocalSelectedCards] = useState<number[]>([]);

    const toggleCardSelection = (card: number) => {
        if (localSelectedCards.includes(card)) {
            setLocalSelectedCards(localSelectedCards.filter((c) => c !== card));
        } else if (localSelectedCards.length < 4) {
            setLocalSelectedCards([...localSelectedCards, card]);
        }
    };

    const confirmed = () => {
        if (localSelectedCards.length > 0 && localSelectedCards.length <= 4) {
            props.cardsAreSelected(localSelectedCards); // Envoie les cartes sélectionnées à GameBoard
        } else {
            alert("Please select between 1 and 4 cards.");
        }
    };

    return (
        <div className="select-cards-container">
            <h2>Select Your Cards</h2>
            {/* <div
                className="card-table-wrapper"
                onClick={(e) => {
                    const target = e.target as HTMLElement;
                    const cardId = target.dataset.cardId ? parseInt(target.dataset.cardId, 10) : null;
                    if (cardId !== null) toggleCardSelection(cardId);
                }}
            >
                <CardTable cardIds={props.cardIds} />
            </div> */}
            <CardTable
                cardIds={props.cardIds}
                toggleSelection={toggleCardSelection}
                selectedCards={localSelectedCards}
            />
            <button
                onClick={confirmed}
                className={`next-button ${localSelectedCards.length > 0 ? "active" : ""}`}
                disabled={localSelectedCards.length === 0}
            >
                Confirm you cards
            </button>
        </div>
    );
};

//     const nextT = () => {
//         props.next(props.cards)
//     }
//     return(
//     <div>
//         je sélectionne mes cartes
//         <button onClick={nextT} >NextStep</button>

//     </div>)
// }
