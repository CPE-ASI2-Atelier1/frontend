import {ICard} from "../components/Card/containers/Card.tsx";
import {CardRow} from "../components/Card/containers/CardRow.tsx";
import React from "react";

// interface IProps {
//     cards:ICard[]
// }

export const Inventory =() => {

    const cards:ICard[] = [ /// TEST
        {
            name: "Card 1",
            description: "Good Card",
            family: "Card-esque",
            affinity: "Power",
            imgUrl: "none",
            smallOmgUrl: "none",
            id: 1,
            energy: 50,
            hp: 26,
            defence: 4,
            attack: 100,
            price: 5050,
            userId: 1,
        },
        {
            name: "Card 2",
            description: "Bad Card",
            family: "Card-esque",
            affinity: "Lyon",
            imgUrl: "none",
            smallOmgUrl: "none",
            id: 2,
            energy: 500,
            hp: 26,
            defence: 4,
            attack: 1,
            price: 50,
            userId: 2,
        }
    ]
    const cardRows = [] as React.ReactNode[];
    cards.forEach((card:ICard) => {
        cardRows.push(<CardRow card={card}/>);
    })
    return (
        <>
            <table>
                {cardRows}
            </table>
            <div>
                <p>DEHORS</p>
            </div>
        </>
    );
}