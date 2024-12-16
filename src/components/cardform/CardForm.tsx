import "./CardForm.css"
import ICard from "../../types/ICard.ts";
import {useEffect, useState} from "react";
import {fetchWIPCard, generateProperties, addCard} from "../../api/cardService.ts";
import {CardFull} from "../Card/containers/CardFull.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../store.ts";

// const DEFAULT_CARD: ICard = {
//     name: "",
//     description: "",
//     family: "",
//     affinity: "",
//     imgUrl: "",
//     smallOmgUrl: "",
//     id: 0,
//     energy: 0,
//     hp: 0,
//     defence: 0,
//     attack: 0,
//     price: 0,
//     userId: useSelector((state:RootState) => state.user.user?.id) ? state.user.user?.id : 0,
// };

const useDefaultCard = (): ICard => {
    const userId = useSelector((state: RootState) => state.user.user?.id) || 0;

    return {
        name: "",
        description: "",
        family: "",
        affinity: "",
        imgUrl: "",
        smallOmgUrl: "",
        id: 0,
        energy: 0,
        hp: 0,
        defence: 0,
        attack: 0,
        price: 0,
        userId, // Utilise le userId dynamique
    };
};

interface IProp {
    cardId: number; // Si -1, la carte n'existe pas...
}

// TODO : display a coter ou on voit la card se créer en live
export const CardForm = (props:IProp) => {

    console.log(props)

    const [card, setCard] = useState<ICard>(useDefaultCard());

    useEffect(() => {
        const loadCard = async (): Promise<void> => {
            if (props.cardId != -1) {
                try {
                    const fetchedCard: ICard = await fetchWIPCard(props.cardId);
                    setCard(fetchedCard);
                } catch (err: any) {
                    console.log(err);
                }
            }
        };
        loadCard();
    }, [props.cardId]);

    // if (props.cardId === -1){
    //     return (
    //         <div></div>
    //     )
    // }
    // if (!card) {
    //     setCard(DEFAULT_CARD);
    // }

    function handleChangeNumber(event: EventTarget & HTMLInputElement): void {
        const value : number = Number(event.value)
        if (isNaN(value)) {
            console.log("Not a valid number !")
            return
        }
        const property : string = event.name;
        setCard({...card, [property] : value})
        console.log(card)
    }

    function handleChangeText(event: EventTarget & HTMLInputElement): void {
        const value : string = event.value
        const property : string = event.name;
        //value.replace('<', '').replace('>', '');
        setCard({...card, [property] : value})
        console.log(card)
    }

    function handleProperties() {
        generateProperties(card).then(r => {
            console.log("id card received")
            console.log(r)
        });
    }

    function handleSubmit() {
        console.log("Submitting...")
        addCard(card).then(r => console.log(r))
    }

    return (
        <>
            <form className="card-form">
                <label htmlFor="name">Nom:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={card.name}
                    onChange={(e) => handleChangeText(e.target)}
                    required
                />

                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={card.description}
                    onChange={(e) => handleChangeText(e.target)}
                    required/>

                <label htmlFor="family">Family:</label>
                <input
                    type="text"
                    id="family"
                    name="family"
                    value={card.family}
                    onChange={(e) => handleChangeText(e.target)}
                    required/>

                <label htmlFor="affinity">Affinity:</label>
                <input
                    type="text"
                    id="affinity"
                    name="affinity"
                    value={card.affinity}
                    onChange={(e) => handleChangeText(e.target)}
                    required/>

                <label htmlFor="imgUrl">Image URL:</label>
                <input
                    type="text"
                    id="imgUrl"
                    name="imgUrl"
                    value={card.imgUrl}
                    onChange={(e) => handleChangeText(e.target)}
                    required/>

                <label htmlFor="price">Price:</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    value={card.price}
                    onChange={(e) => handleChangeNumber(e.target)}
                    required
                />

                <label htmlFor="attack">Attack:</label>
                <input
                    type="text"
                    id="attack"
                    name="attack"
                    value={card.attack}
                    readOnly required/>

                <label htmlFor="defense">Defense:</label>
                <input type="text" id="defense" name="defense" value={card.defence} readOnly required/>

                <label htmlFor="energy">Energy:</label>
                <input type="text" id="energy" name="energy" value={card.energy} readOnly required/>

                <label htmlFor="hp">HP:</label>
                <input type="text" id="hp" name="hp" value={card.hp} readOnly required/>

                <input type="button" id="generateProperties" value="Generate Props" onClick={handleProperties}/>

                <input
                    type="submit"
                    id="createCard"
                    value="Create Card"
                    onClick={handleSubmit}/>

            </form>
            <CardFull card={card}></CardFull>
        </>
    )
}