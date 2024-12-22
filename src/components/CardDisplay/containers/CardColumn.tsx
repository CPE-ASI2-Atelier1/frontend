import { Card } from "../../Card/Card";
import styles from "./CardColumn.css";

interface IProps {
    cardIds: number[];
    onCardClick: (cardId: number) => void; // Callback pour gérer le clic sur une carte
    selectedCardIds: number[]; // Liste des cartes sélectionnées
}

export const CardColumn = (props: IProps) => {
    return (
        <div className="card-column">
            {props.cardIds.map((cardId) => (
                <div
                    key={cardId}
                    className={`card-column-item ${
                        props.selectedCardIds.includes(cardId) ? "selected" : ""
                    }`}
                    onClick={() => props.onCardClick(cardId)} // Gère le clic
                >
                    <Card display="full" cardId={cardId} isWIP={false} />
                </div>
            ))}
        </div>
    );

};
