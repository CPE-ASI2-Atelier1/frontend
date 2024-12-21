import { useState } from "react";
import IUser from "../../../types/IUser";
import "./Board.css";
import { Card } from "../../Card/Card";
import ICard from "../../../types/ICard";
import { CardColumn } from "../../CardDisplay/containers/CardColumn";

interface IProps{
    user: IUser;
    cards: ICard[];
}

export const Board = (props:IProps) => {
    const user = props.user;

    const [progress, setProgress] = useState<number>(0);

    // Fonction qui génère une valeur aléatoire de progression et la met à jour
    const handleClick = () => {
        const value = Math.floor(Math.random() * 100);
        setProgress(value); // Met à jour la progression
    };

    const userCards = props.cards.map((card) => card.id);
    console.log(userCards);
    return (
        <div className="board-container">
            <div>{user.login}</div>
            <div className="progress" onClick={handleClick} style={{ "--progress": `${progress}%` } as React.CSSProperties}>
                <div className="bar">
                    <div className="progress-value" style={{ width: `${progress}%` }}></div>
                
                </div>
            </div>
            <div>{progress}%</div>
            <div className="board-container">
                <h2>Player's Cards</h2>
                <CardColumn cardIds={userCards} />
            </div>
        </div>
    )
}