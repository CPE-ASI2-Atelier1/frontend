import IUser from "../../../types/IUser";

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
        </div>
    );
};
