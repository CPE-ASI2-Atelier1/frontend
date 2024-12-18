import "./Messages.css";
import IUser from "../../../types/IUser";

interface IProps {
    users: IUser[];
    receiverId: number | null; // Pour savoir quel utilisateur est connecté
    setReceiverId: (id: number) => void;
}

export const SelectReceiver =(props:IProps)=> {
    return (
        <div className="recevier-select">
            <label htmlFor="receiverSelect">Choisissez un utilisateur :</label>
            <select 
                id="receiverSelect" 
                value={props.receiverId || ''} 
                onChange={(e) => props.setReceiverId(Number(e.target.value))}
            >
                <option value="">-- Sélectionner un utilisateur --</option>
                {props.users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.login} (ID: {user.id})
                    </option>
                ))}
            </select>
        </div>
    )
}