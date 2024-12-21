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
}

export const Board = (props:IProps) => {
    const user = props.user;

    // Fonction qui génère une valeur aléatoire de progression et la met à jour

    const userCards = props.cards.map((card) => card.id);
    console.log(userCards);
    return (
        <div className="board-container">
            <div>{user.login}</div>
            <div className="energy" style={{ "--energy": `${props.energy}%` } as React.CSSProperties}>
                <div className="bar">
                    <div className="energy-value" style={{ width: `${props.energy}%` }}></div>
                
                </div>
            </div>
            <div>{props.energy}%</div>
            <div className="board-container">
                <h2>{user.login}'s Cards</h2>
                <CardColumn cardIds={userCards} />
            </div>
        </div>
    )
}