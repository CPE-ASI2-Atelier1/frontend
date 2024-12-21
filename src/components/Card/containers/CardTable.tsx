import ICard from "../../../types/ICard";
import { CardFull } from "./CardFull";

interface ICardTableProps {
    cards: ICard[];
}

export const CardTable = (props: ICardTableProps) => {
    return (
        <div className="card-table-container">
            <div className="card-table">
                {props.cards.map((card) => (
                    <div key={card.id} className="card-item-small">
                        <CardFull card={card} />
                    </div>
                ))}
            </div>
        </div>
    );
};