/**
 * @author Evann Nalewajek
 */

import IUser from "../../../types/IUser";
import { Card } from "../../Card/Card";
import ICard from "../../../types/ICard";

interface IProps {
    user: IUser;
}

export const UserLargeDisplay = (props: IProps) => {
    return (
        <div>
            <h2>ID : {props.user.id}</h2>
            <h3>Nom d'utilisateur : {props.user.login}</h3>
            <p>Prénom : {props.user.lastName}</p>
            <p>Nom : {props.user.surName}</p>
            <p>Email : {props.user.email}</p>
            <p>Argent : {props.user.account}€</p>
            <h4>Liste de cartes :</h4>
            {props.user.cardList.length > 0 ? (
                <div className="card-list">
                    {props.user.cardList.map((card: ICard) => (
                        <Card cardId={card.id} display="full"></Card>
                    ))}
                </div>
            ) : (
                <p>Aucune carte disponible.</p>
            )}
        </div>
    );
};
