import React, { useState, useEffect } from "react";
import "./CardTable.css";
import { Card } from "../../Card/Card";

interface IProps {
    cardIds: number[];
    toggleSelection: (cardId: number) => void;
    selectedCards: number[];
}

export const CardTable = (props: IProps) => {
    return (
        <div className="card-table">
            {props.cardIds.map((cardId) => (
                <div
                    key={cardId}
                    className={`card-item ${props.selectedCards.includes(cardId) ? "selected" : ""}`}
                    onClick={() => props.toggleSelection(cardId)}
                >
                    <Card display="full" cardId={cardId} isWIP={false} />
                </div>
            ))}
        </div>
    );
};