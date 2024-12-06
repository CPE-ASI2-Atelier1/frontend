import {CardName} from "../components/CardName.tsx";
import {useDispatch} from "react-redux";
import {cardSelection} from "../../../slices/cardSlice.ts";
import {ICard} from "../Card.tsx";
import "./CardRow.css"

interface IProps {
    card: ICard;
}

export const CardRow=(props:IProps)=> {
    const dispatch = useDispatch();

    function handleClick(){
        dispatch(cardSelection(props.card))
    }

    return (
        <tr className="card-row" onClick={handleClick}>
            <td>
                <CardName title={props.card.name}></CardName>
            </td>
            <td>{props.card.price}</td>
            <td>{props.card.attack}</td>
            <td>{props.card.defence}</td>
            <td>{props.card.userId}</td>
        </tr>
    )
}