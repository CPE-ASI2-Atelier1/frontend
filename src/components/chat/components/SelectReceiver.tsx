import React from "react";
import "./SelectReceiver.css";

interface User {
    id: number;
    name: string;
}

interface IProps {
    users: User[];
    receiverId: number | null; // ID du destinataire actuellement sélectionné
    setReceiverId: (id: number | null) => void; // Fonction pour mettre à jour le destinataire sélectionné
}

export const SelectReceiver = (props: IProps) => {
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value === "" ? null : Number(e.target.value);
        props.setReceiverId(selectedValue); // Met à jour le destinataire sélectionné
    };

    return (
        <div className="receiver-select">
            <label htmlFor="receiverSelect" className="receiver-label">
                Select a recipient:
            </label>
            <select
                id="receiverSelect"
                value={props.receiverId !== null ? props.receiverId : ""}
                onChange={handleSelectChange}
                aria-label="Select a recipient to chat with"
                className={`receiver-dropdown ${props.users.length === 0 ? "disabled" : ""}`}
                disabled={props.users.length === 0} // Désactiver si aucun utilisateur disponible
            >
                <option value="" disabled>
                    Please select someone to chat with
                </option>
                {props.users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
