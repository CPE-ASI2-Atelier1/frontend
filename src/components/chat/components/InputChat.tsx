import React, { useState } from "react";
import { Socket } from "socket.io-client"; // Import de socket.io-client
import "./InputChat.css";

interface IProps {
    socket: Socket; // On passe le socket en prop pour pouvoir l'utiliser
    senderId: number; // Id de l'utilisateur connecté
    receiverId: number | null; // Id de l'utilisateur cible
    setSentMessages: React.Dispatch<React.SetStateAction<string[]>>; // Fonction pour mettre à jour les messages envoyés
}

export const InputChat = (props: IProps) => {
    const [Msg, setMsg] = useState<string>("");

    const handleSendMessage = () => {
        if (Msg.trim() !== "" && (props.receiverId || props.receiverId === 0)) {
            const messageData = {
                senderId: props.senderId,
                receiverId: props.receiverId, // Destinataire
                message: Msg,
            };

            props.setSentMessages((prevMessages) => [...prevMessages, Msg]); // Met à jour les messages envoyés

            // Envoie le message au serveur via le socket
            props.socket.emit("SEND_MESSAGE", messageData);

            // Réinitialise le champ de saisie
            setMsg("");
        }
    };

    return (
        <div className="chat-input-container">
            <input
                type="text"
                placeholder={
                    props.receiverId || props.receiverId === 0
                        ? "Write a message..."
                        : "Select a recipient first..."
                }
                value={Msg}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMsg(e.target.value)}
                onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
                    e.key === "Enter" && handleSendMessage()
                }
                readOnly={!props.receiverId && props.receiverId !== 0} // Rend le champ non modifiable si aucun destinataire n'est sélectionné
                aria-label="Message input"
            />
            <button
                onClick={handleSendMessage}
                disabled={!props.receiverId && props.receiverId !== 0}
                aria-label="Send message"
                className={!props.receiverId && props.receiverId !== 0 ? "disabled" : ""}
            >
                Send
            </button>
        </div>
    );
};
