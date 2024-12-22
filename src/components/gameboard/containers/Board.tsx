import { useState } from "react";
import IUser from "../../../types/IUser";
import "./Board.css";
import { Card } from "../../Card/Card";
import ICard from "../../../types/ICard";
import { CardColumn } from "../../CardDisplay/containers/CardColumn";

interface IProps{
    user: IUser;
    cards: ICard[];
    energy: number;
    onCardSelection: (selectedCardId: number | null) => void; // Callback pour remonter la carte sélectionnée

}

export const Board = (props:IProps) => {
    const user = props.user;

    const [selectedCard, setSelectedCard] = useState<number | null>(null); // Cartes sélectionnées

    const toggleCardSelection = (cardId: number) => {
        const newSelection = selectedCard === cardId ? null : cardId;
        setSelectedCard(newSelection);

        // Remonte la sélection au parent si le callback est défini
        if (props.onCardSelection) {
            props.onCardSelection(newSelection);
        }
    };

    const userCards = props.cards.map((card) => card.id);
    console.log(userCards);

    return (
        <div className="board-container">
            <h2>{user.login}'s Deck</h2>
            <div className="energy" style={{ "--energy": `${props.energy}%` } as React.CSSProperties}>
                <div className="bar">
                    <div
                        className="energy-value"
                        style={{ width: `${props.energy}%` }}
                    ></div>
                </div>
            </div>
            <div><b>{props.energy}%</b></div>
            <div className="cards-wrapper">
                {/* board-container */}
                <CardColumn
                    cardIds={userCards}
                    onCardClick={toggleCardSelection} // Passe la logique de sélection
                    selectedCardIds={selectedCard ? [selectedCard] : []} // Met à jour les styles
                />
            </div>
        </div>
    );
}