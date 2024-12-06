// TEST - TO REMOVE
import {ICard, Card} from "../components/Card/Card.tsx";

export const CardDisplay =() =>{
    const card:ICard = {
        name: "Floppa",
        description: "Floppa McFlopper Floppin' arround.",
        family: "Felines",
        affinity: "Lyon",
        imgUrl: "https://assets.coingecko.com/coins/images/36969/large/floppa.jpg?1722771377",
        smallOmgUrl: "https://assets.coingecko.com/coins/images/36969/large/floppa.jpg?1722771377",
        id: 2,
        energy: 500,
        hp: 26,
        defence: 4,
        attack: 1,
        price: 69,
        userId: 2,
    }

    return (
        <>
            <Card card={card} display="full"></Card>
        </>
    )
}