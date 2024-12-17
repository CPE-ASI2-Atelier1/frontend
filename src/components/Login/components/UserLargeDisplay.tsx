
import IUser from "../../../types/IUser";

interface IProps {
    user: IUser;
}

export const UserLargeDisplay = (props: IProps) => {
    return (
        <div>
            <h2>My ID : {props.user.id}</h2>
            <h3>Username : {props.user.login}</h3>
            <p>Name : {props.user.lastName}</p>
            <p>Surname : {props.user.surName}</p>
            <p>Email : {props.user.email}</p>
            <p>Money : {props.user.account}€</p>
        </div>
    );
};
