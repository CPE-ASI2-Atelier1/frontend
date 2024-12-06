import {CardFull} from "./containers/CardFull.tsx";
import {CardRow} from "./containers/CardRow.tsx";

enum CardDisplay {
    FULL = "full",
    ROW = "row",
}

export interface ICard {
    name: string;
    description: string;
    family: string;
    affinity: string;
    imgUrl: string;
    smallOmgUrl: string;
    id: number;
    energy: number;
    hp: number;
    defence: number;
    attack: number;
    price: number;
    userId: number;
}

interface IProps {
    display: string;
    card: ICard;
    // id : number // Instead of giving the whole card (dependency between APP and ICARD)
}

export const Card=(props:IProps) => {
    let result;
    switch (props.display) {
        case CardDisplay.FULL:
            result = (<CardFull card={props.card} />)
            break;
        case CardDisplay.ROW:
            result = (<CardRow card={props.card} />)
            break;
        default:
            break;
    }
    return result;
}