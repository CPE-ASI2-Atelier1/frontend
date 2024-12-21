import { Card } from "../../Card/Card";
import styles from "./CardColumn.css";

interface CardColumnProps {
    cardIds: number[]; // IDs des cartes à afficher
}

export const CardColumn = ({ cardIds }: CardColumnProps) => {
    return (
        <div className={styles["card-column"]}>
            {cardIds.map((cardId) => (
                <div key={cardId} className={styles["card-column-item"]}>
                    <Card display="full" cardId={cardId} isWIP={false} />
                </div>
            ))}
        </div>
    );
};
