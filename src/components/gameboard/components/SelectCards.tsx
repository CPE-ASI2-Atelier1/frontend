import { useState } from "react";
import ICard from "../../../types/ICard";
import { Card } from "../../Card/Card";

interface IProps {
    cards: number[];
    setSelectedCards: (cards: number[]) => void;
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
            props.setSelectedCards(localSelectedCards); // Envoie les cartes sélectionnées à GameBoard
        } else {
            alert("Please select between 1 and 4 cards.");
        }
    };

    return (
        <div className="select-cards-container">
            <h2>Select Your Cards</h2>
            <div className="cards-grid">
                {props.cards.map((cardId) => (
                    <div
                        key={cardId}
                        className={`card-item ${localSelectedCards.includes(cardId) ? "selected" : ""}`}
                        onClick={() => toggleCardSelection(cardId)}
                    >
                        <Card key={cardId} display={'full'} cardId={cardId} isWIP={false} />
                    </div>
                ))}
            </div>
            <button onClick={confirmed} className="next-button">
                Next Step
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
