/**
 * @author Arthur Jezequel
 */

import {Card} from "../components/Card/Card.tsx";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store.ts";

// TODO : This take the userId as input so it can fetch all cards of the current user (filter FetchAllCards() on userId)

/**
 * Inventory page that displays all the user's card
 * @constructor
 */
export const Inventory =() => {
    const cardId:number = useSelector((state:RootState ) => state.cardReducer.cardId)
    // QUITTER L INVENTAIRE DEVRAIT REMETTRE LE STATE A NULL !
    // TODO : ASSURER QUE ACHAT ET VENTE METTE AUSSI A JOUR L UTILISATEUR COURANT

    const cardIds: number[] | undefined = useSelector((state:RootState) => state.user.user?.cardList)
    const cardRows = [] as React.ReactNode[];
    cardIds?.forEach((id:number) => {
        cardRows.push(<Card cardId={id} display="row"/>);
    })
    return (
        <>
            <table>
                {cardRows}
            </table>
            <div>
                <Card cardId={cardId} display="full" />
            </div>
        </>
    );
}