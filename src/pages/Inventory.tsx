import { Card } from "../components/Card/Card.tsx";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store.ts";
import { fetchWIPCards } from "../api/wipCardService.ts";
import { useNavigate } from 'react-router-dom';
import styles from "./inventory.module.css";

interface IProps {
    isWip: boolean;
}

export const Inventory = (props: IProps) => {
    const cardId: number = useSelector((state: RootState) => state.cardReducer.cardId ?? -1);
    const userId: number | undefined = useSelector((state: RootState) => state.user.user?.id);
    const finishedCardIds: number[] | undefined = useSelector((state: RootState) => state.user.user?.cardList);
    
    const [cardIds, setCardIds] = useState<number[] | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCards = async () => {
            if (props.isWip && userId !== undefined) {
                try {
                    console.log("Try to fetch cards for userID :"+userId);
                    const cardList = await fetchWIPCards(userId);
                    setCardIds(cardList.map((card) => card.id));
                    console.log("Found cards : "+JSON.stringify(cardList)+" for userID :"+userId);
                } catch (error) {
                    console.error("Erreur lors de la récupération des WIP cards:", error);
                    setCardIds([]);
                }
            } else {
                setCardIds(finishedCardIds);
            }
        };

        fetchCards();
    }, [props.isWip, userId, finishedCardIds]);

    const editInCardCreator = (id: number) => {
        navigate('/create', { state: { id } });
    };

    const cardRows = [] as React.ReactNode[];
    console.log("Content of cardIds : "+JSON.stringify(cardIds));
    cardIds?.forEach((id: number) => {
        cardRows.push(<Card key={id} cardId={id} isWIP={props.isWip} display="row" />);
    });

    return (
        <div className={styles["inventory-container"]}>
            {/* Tableau des cartes */}
            <div className={styles["card-table"]}>
                {cardRows.length === 0 ? (
                    <p className={styles["no-cards-message"]}>
                        You may create new cards to see them here.
                    </p>
                ) : (
                    cardRows
                )}
            </div>

            {/* Affichage de la carte principale sélectionnée */}
            {cardId !== -1 ? (
                <div
                    className={styles["selected-card-container"]}
                    onClick={() => editInCardCreator(cardId)}
                >
                    <Card cardId={cardId} isWIP={props.isWip} display="full" />
                </div>
            ) : (
                <p className={styles["no-selection-message"]}>
                    Please select a card.
                </p>
            )}
        </div>
    );
};
