import "./Messages.css";
import IMessage from "../../../types/IMessage";

interface IProps {
    receivedMessages: IMessage[]; // Messages reçus
    sentMessages: string[]; // Messages envoyés
    userId: number; // ID de l'utilisateur connecté
}

export const Messages = (props: IProps) => {
    return (
        <div className="chat-messages-container">
            <div className="received-messages">
                {props.receivedMessages.map((message: IMessage, index: number) => (
                    <div key={index} className="chat-message received-message">
                        <strong>User {message.senderId}:</strong> {message.message}
                    </div>
                ))}
            </div>
            <div className="sent-messages">
                {props.sentMessages.map((message: string, index: number) => (
                    <div key={index} className="chat-message sent-message">
                        <strong>Me:</strong> {message}
                    </div>
                ))}
            </div>
        </div>
    );
};
