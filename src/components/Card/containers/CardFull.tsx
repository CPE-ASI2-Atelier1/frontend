/**
 * @author Arthur Jezequel
 */

import {CardName} from "../components/CardName.tsx";
import {Media} from "../../common/components/Media.tsx";
import './Card.css'
import {CardProperties} from "../components/CardProperties.tsx";
import ICard from "../../../types/ICard.ts";

interface IProps {
    card: ICard;
}

/**
 * Component for showing a full card component on the page.
 * @param props props containing the card (ICard interface)
 * @constructor
 */
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
                hp={props.card.hp} 
                family={props.card.family}
                affinity={props.card.affinity}  
                >
            </CardProperties>
        </div>
    )
}