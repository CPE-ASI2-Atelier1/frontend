/**
 * @author Thibault BERTHET
 */
import {CardRow} from "../components/Card/containers/CardRow.tsx"
import {Card} from "../components/Card/Card.tsx"
import {fetchCards, buyCard} from "../api/marketService";
import ICard from "../types/ICard"
import {useState, useEffect} from "react";
import { RootState } from "../store.ts";
import { useSelector } from "react-redux";
import styles from "./market.module.css"

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
    let cardId: number = useSelector((state: RootState) => state.cardReducer.cardId ?? -1);
    let userId: number = useSelector((state: RootState) => state.user.user?.id ?? -1);
    const [cards, setCards] = useState<ICard[]>([]);
    let cardList : ICard[] = [];

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

    // Permet de ne garder que les cartes qui ne sont pas 
    // possédées par quelqu'un mais que des cartes créées
    cards.forEach((card: ICard) => { 
       !card.userId && cardList.push(card) 
    })

    const cardRow = cardList.map((card: ICard) => (
                <CardRow card={card} />
    ));

    return (
        <div className={styles["market-container"]}>
            <div className={styles["card-table"]}>
                <table>
                    {cardList.length !== 0 ?
                    (
                    <>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Attack</th>
                            <th>Defence</th>
                            <th>Energy</th>
                            <th>Health</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cardRow}
                    </tbody>
                    </>
                    ):( 
                        <tbody>
                            <tr className={styles["no-cards-message"]}><p>No any card to buy yet, try to come later !</p></tr>
                        </tbody>
                    )}
                </table>
            </div>
            {cardId !== -1 && cardList.length !== 0 && (
            <div className={styles["selected-card-container"]}>
            <Card display={CardDisplay.FULL} cardId={cardId} isWIP={false}/>
            <button id="buyCard" onClick={() => buyCard(userId, cardId)}>
                Buy
            </button>
        </div>
    )}
        </div>
    )
}