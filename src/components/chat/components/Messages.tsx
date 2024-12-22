import "./Messages.css";
import IMessage from "../../../types/IMessage";

interface IProps {
    receivedMessages: IMessage[]; // Messages reçus
    sentMessages: IMessage[]; // Messages envoyés
    userId: number; // ID de l'utilisateur connecté
}

export const Messages = (props: IProps) => {
    // Fusionner les messages reçus et envoyés avec leurs timestamps
    const allMessages = [
        ...props.receivedMessages.map((msg) => ({
            ...msg,
            isSent: false, // Identifie un message reçu
            timestamp: new Date(msg.timestamp).getTime(), // Convertir le timestamp en nombre
        })),
        ...props.sentMessages.map((msg) => ({
            message: msg.message,
            senderId: props.userId, // Les messages envoyés viennent de l'utilisateur
            timestamp: msg.timestamp,
            isSent: true, // Identifie un message envoyé
        })),
    ];

    // Trier les messages par timestamp
    const sortedMessages = allMessages.sort((a, b) => a.timestamp - b.timestamp);
    console.log(allMessages)

    return (
        <div className="chat-messages">
            {sortedMessages.map((message, index) => (
                <div
                    key={index}
                    className={`chat-message ${
                        message.senderId === props.userId ? "my-message" : "other-message"
                    }`}
                >
                    <strong>
                        {message.senderId === props.userId ? "Moi" : `Utilisateur ${message.senderId}`} :
                    </strong>
                    {message.message}
                    <div className="timestamp">
                        {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                </div>
            ))}
        </div>
    );
};
