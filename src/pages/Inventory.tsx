import {ICard, Card} from "../components/Card/Card.tsx";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store.ts";

// interface IProps {
//     cards:ICard[]
// }

export const Inventory =() => {

    const cardDisplay = useSelector((state:RootState ) => state.cardReducer.card)

    const cards:ICard[] = [ /// TEST
        {
            name: "Mewtwo",
            description: "Good CardFull",
            family: "Psy",
            affinity: "Power",
            imgUrl: "https://static.printler.com/cache/8/a/2/f/b/1/8a2fb18dd21981cdf402b34c2788d39bcbb59657.jpg",
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
            name: "Mew",
            description: "Perfect CardFull",
            family: "Cat",
            affinity: "Felines",
            imgUrl: "https://i.pinimg.com/474x/4d/a9/9f/4da99f66d7f5d439b4639b5a217e5fb1.jpg",
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
        cardRows.push(<Card card={card} display="row"/>);
    })
    return (
        <>
            <table>
                {cardRows}
            </table>
            <div>
                <Card card={cardDisplay} display="full" />
            </div>
        </>
    );
}