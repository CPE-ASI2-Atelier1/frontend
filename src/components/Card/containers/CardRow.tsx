import {CardName} from "../components/CardName.tsx";
import {ICard} from "./Card.tsx";
import "../CardRow.css"

interface IProps {
    card: ICard;
}

export const CardRow=(props:IProps)=> {
    return (
        <tr className="card-row">
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