import {CardName} from "../components/CardName.tsx";
import {Media} from "../../common/components/Media.tsx";
import '../Card.css'
import {CardProperties} from "../components/CardProperties.tsx";

// enum display {
//     FULL = 'FULL',
//     SMALL = 'SMALL',
// }

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
    card: ICard;
}

export const Card=(props:IProps)=> {
    return (
        <div className="card-container">
            <CardName title={props.card.name}></CardName>
            <Media
                source={props.card.imgUrl}
                type="img"
                className="card-media">
            </Media>
            <CardProperties
                energy={props.card.energy}
                attack={props.card.attack}
                defence={props.card.defence}
                hp={props.card.hp} >
            </CardProperties>
        </div>
    )
}