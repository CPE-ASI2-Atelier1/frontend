import ICard from "../../../types/ICard";
import { Card } from "../../Card/Card";
import { CardFull } from "../../Card/containers/CardFull";
import "./CardColumn.css";

interface IProps {
    cards: ICard[];
    onCardClick: (cardId: number) => void; // Callback pour gérer le clic sur une carte
    selectedCardIds: number[]; // Liste des cartes sélectionnées
}

export const CardColumn = (props: IProps) => {
    const handleCardClick = (card: ICard) => {
        if (card.hp! > 0) {
            props.onCardClick(card.id); // Seules les cartes avec HP > 0 peuvent être sélectionnées
        }
    };
    return (
        <div className="card-column">
            {props.cards.map((card) => (
                <div
                    key={card.id}
                    className={`card-column-item ${
                        props.selectedCardIds.includes(card.id) ? "selected" : ""
                    } ${card.hp === 0 ? "disabled" : ""}`}
                    onClick={() => handleCardClick(card)} // Gère le clic
                >
                    <CardFull card={card} />
                </div>
            ))}
        </div>
    );

};
