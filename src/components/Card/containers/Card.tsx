import {CardName} from "../components/CardName.tsx";
import {Media} from "../../common/components/Media.tsx";
import '../Card.css'

// enum display {
//     FULL = 'FULL',
//     SMALL = 'SMALL',
// }

export interface ICard {
    media: string;
    mediaType: string;
    name: string;
    // properties: never; // To be defined
    price: number;
}

interface IProps {
    card: ICard;
}

export const Card=(props:IProps)=> {
    return (
        <div className="card-container">
            <CardName title={props.card.name}></CardName>
            <Media
                source={props.card.media}
                type={props.card.mediaType}
                className="card-media">
            </Media>
        </div>
    )
}