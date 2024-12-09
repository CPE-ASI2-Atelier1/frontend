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

    // const cardDisplay = useSelector((state:RootState ) => state.cardReducer.card)
    const cardId:number = useSelector((state:RootState ) => state.cardReducer.cardId)

    const cardIds: number[] = [1, 2, 3, 4, 5 ] // Need to be coming from userService
    const cardRows = [] as React.ReactNode[];
    cardIds.forEach((id:number) => {
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