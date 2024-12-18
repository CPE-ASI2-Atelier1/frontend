/**
 * @author Thibault BERTHET
 */
import {CardRow} from "../components/Card/containers/CardRow.tsx"
import {Card} from "../components/Card/Card.tsx"
import {fetchCards, buyCard} from "../api/marketService";
import ICard from "../types/ICard"
import {useState, useEffect} from "react";
import "./market.module.css"

enum CardDisplay {
    FULL = "full",
    ROW = "row",
}

/**
 * Component for showing the market on the page.
 * @param
 * @constructor
 */
export const Market=()=> {

    //const cards = props.cards;
    const [selectedCard, setSelectedCard] = useState<ICard | null>(null);
    const [cards, setCards] = useState<ICard[]>([]);

    useEffect(() => {
        const loadCards = async () => {
            try {
                const fetchedCards = await fetchCards();
                setCards(fetchedCards);
                console.log(fetchedCards);
            } catch (err) {
                console.error("Erreur lors du chargement des cartes :", err);
            }
        };

        loadCards();
    }, []);

    const cardRow = cards.map((card: ICard) => (
            <tbody onClick={() => setSelectedCard(card)} key={card.id}>
                <CardRow card={card} />
            </tbody>
    ));

    return (
        <div className="market-full">
            <div className="market-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Attack</th>
                            <th>Defence</th>
                            <th>Energy</th>
                            <th>User Id</th>
                        </tr>
                    </thead>
                    {cardRow}
                </table>
            </div>
            {selectedCard && (
            <div className="card-section">
                <Card display={CardDisplay.FULL} cardId={selectedCard.id} isWIP={false}/>
                <button id="buyCard" onClick={() => buyCard(selectedCard.userId, selectedCard.id)}>
                    Buy
                </button>
            </div>
    )}
        </div>
    )
}



        // <div className="market-full">
        //     <table>
        //         <thead>
        //         <tr>
        //             <th>Name</th>
        //             <th>Price</th>
        //             <th>Attack</th>
        //             <th>Defence</th>
        //             <th>Energy</th>
        //             <th>User Id</th>
        //         </tr>
        //         </thead>
        //         {cardRow}
        //     </table>
        //     {selectedCard && (
        //         <div className="showInfos">
        //             <Card display={CardDisplay.FULL} cardId={selectedCard.id} isWIP={false}/>
        //             <button id="buyCard" value="Buy" onClick={() => buyCard(selectedCard.userId, selectedCard.id)}/>
        //         </div>
        //     )}
        // </div>