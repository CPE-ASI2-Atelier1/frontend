import "./CardTable.css";
import { Card } from "../../Card/Card";
import "./CardColumn.css";

interface CardColumnProps {
    cardIds: number[]; // IDs des cartes à afficher
}

export const CardColumn = ({ cardIds }: CardColumnProps) => {
    return (
        <div className="card-column">
            {cardIds.map((cardId) => (
                <div key={cardId} className="card-column-item">
                    <Card display="full" cardId={cardId} isWIP={false} />
                </div>
            ))}
        </div>
    );
};
