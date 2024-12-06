import { IUser } from "../containers/User";

interface IProps {
    user: IUser;
}

export const UserLargeDisplay = (props:IProps) => {
    return (
        <div>
            <h2>ID : {props.user.id}</h2>
            <h3>Nom d'utilisateur : {props.user.username}</h3>
            <p>Argent : {props.user.money}€</p>
        </div>
    );
};
