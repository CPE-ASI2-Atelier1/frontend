import "./CardForm.css"
import ICard from "../../types/ICard.ts";
import {useEffect, useState} from "react";
import {fetchWIPCard, generateProperties, addCard, delWipCard} from "../../api/cardService.ts";
import {CardFull} from "../Card/containers/CardFull.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../store.ts";
import { useNavigate } from "react-router-dom";

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
        energy: null,
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

    const navigate = useNavigate();

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

    function handleChangeNumber(event: EventTarget & HTMLInputElement): void {
        const value : number = Number(event.value)
        if (isNaN(value)) {
            console.log("Not a valid number !")
            return
        }
        const property : string = event.name;
        setCard({...card, [property] : value})
        console.log("Card status on number change : " + JSON.stringify(card))
    }

    function handleChangeText(event: EventTarget & HTMLInputElement): void {
        const value : string = event.value
        const property : string = event.name;
        setCard({...card, [property] : value})
        console.log("Card status on text change : " + JSON.stringify(card))
    }

    function isValidUrl(value: string): boolean {
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    }

    function handleProperties() {
        if (!isValidUrl(card.imgUrl)){
            alert("Please enter a valid URL to generate the properties");
            return;
        }
        generateProperties(card).then(r => {
            console.log("Card Id received : "+ r)
            card.id = r;
            navigate("/creations");
        });
    }

    function handleSubmit() {
        // Validation manuelle pour les champs readonly
        if (card.energy === null || card.energy === undefined) {
            alert("Energy is required !\nYou may write an Image URL and generate properties.");
            return;
        }
        if (card.attack === 0) {
            alert("Attack is required!\nYou may write an Image URL and generate properties.");
            return;
        }
        if (card.defence === 0) {
            alert("Defence is required!\nYou may write an Image URL and generate properties.");
            return;
        }
        if (card.hp === 0) {
            alert("HP is required!\nYou may write an Image URL and generate properties.");
            return;
        }
        console.log("Submitting...")
        addCard(card).then(r => console.log("Card added to the market : "+ JSON.stringify(r)))
        console.log("ID of the card to delete form wip db : "+props.cardId);
        delWipCard(props.cardId);
        navigate("/market");
    }

    return (
        <div className="card-form-container">
            {/* Formulaire à gauche */}
            <form className="card-form"onSubmit={(e) => {
                e.preventDefault(); // Empêche le rechargement de la page
                handleSubmit();
            }}>
                <h1>Card Creator</h1>
                <label htmlFor="name">Name:</label>
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
                    required
                />
    
                <label htmlFor="family">Family:</label>
                <input
                    type="text"
                    id="family"
                    name="family"
                    value={card.family}
                    onChange={(e) => handleChangeText(e.target)}
                    required
                />
    
                <label htmlFor="affinity">Affinity:</label>
                <input
                    type="text"
                    id="affinity"
                    name="affinity"
                    value={card.affinity}
                    onChange={(e) => handleChangeText(e.target)}
                    required
                />
    
                <label htmlFor="imgUrl">Image URL:</label>
                <input
                    type="text"
                    id="imgUrl"
                    name="imgUrl"
                    value={card.imgUrl}
                    onChange={(e) => handleChangeText(e.target)}
                    required
                />
    
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
                    value={card.attack ? card.attack : undefined}
                    readOnly
                    required
                />
    
                <label htmlFor="defense">Defense:</label>
                <input
                    type="text"
                    id="defense"
                    name="defense"
                    value={card.defence ? card.defence : undefined}
                    readOnly
                    required
                />
    
                <label htmlFor="energy">Energy:</label>
                <input
                    type="text"
                    id="energy"
                    name="energy"
                    value={card.energy ? card.energy : undefined}
                    readOnly
                    required
                />
    
                <label htmlFor="hp">HP:</label>
                <input
                    type="text"
                    id="hp"
                    name="hp"
                    value={card.hp ? card.hp : undefined}
                    readOnly
                    required
                />
    
                <input
                    type="button"
                    id="generateProperties"
                    value="Generate Props"
                    onClick={handleProperties}
                />
    
                <input
                    type="submit"
                    id="createCard"
                    value="Create Card"
                />
            </form>
    
            {/* Carte affichée à droite */}
            <div className="card-full">
                <CardFull card={card} />
            </div>
        </div>
    );    
}