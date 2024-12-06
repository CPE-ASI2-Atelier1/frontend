import {CardName} from "../components/CardName.tsx";
import {Media} from "../../common/components/Media.tsx";
import './Card.css'
import {CardProperties} from "../components/CardProperties.tsx";
import {ICard} from "../Card.tsx";

// enum display {
//     FULL = 'FULL',
//     SMALL = 'SMALL',
// }

interface IProps {
    card: ICard;
}

export const CardFull=(props:IProps)=> {
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