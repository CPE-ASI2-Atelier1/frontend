/**
 * @author Arthur Jezequel
 */

import {CardName} from "../components/CardName.tsx";
import {useDispatch} from "react-redux";
import {cardSelection} from "../../../slices/cardSlice.ts";
import ICard from "../../../types/ICard.ts";
import "./CardRow.css"

interface IProps {
    card: ICard;
}

/**
 * Card display component. It is used to create a row representing the given card.
 * @param props Properties containing the card to show.
 * @constructor 
 */
export const CardRow=(props:IProps)=> {
    const dispatch = useDispatch();

    function handleClick(){
        // dispatch(cardSelection(props.card))
        dispatch(cardSelection(props.card.id))
    }

    return (
        <tr className="card-row" onClick={handleClick}>
            <td>
                <CardName title={props.card.name}></CardName>
            </td>
            <td>{props.card.description}</td>
            <td>{props.card.price}</td>
            <td>{props.card.attack}</td>
            <td>{props.card.defence}</td>
            <td>{props.card.energy}</td>
            <td>{props.card.hp}</td>
            {/* <td>{props.card.userId}</td> */}
        </tr>
    )
}