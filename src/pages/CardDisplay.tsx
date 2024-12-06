// TEST - TO REMOVE
import {Card, ICard} from "../components/Card/containers/Card";

export const CardDisplay =() =>{
    // const [count, setCount] = useState(0)
    const card:ICard = {
        media: "https://assets.coingecko.com/coins/images/36969/large/floppa.jpg?1722771377",
        mediaType: "img", // A voir si on peut pas faire remonter MediaType enum
        name: "Floppa",
        price: 500,
    }

    return (
        <>
            <Card card={card}></Card>
        </>
    )
}