import "./Messages.css";
import IMessage from "../../../types/IMessage";

interface IProps {
    receivedMessages: IMessage[];
    userId: number; // Pour savoir quel utilisateur est connecté
    sentMessages: string[];
}
// export const Messages =(props:IProps)=> {
//     return (
//         <div className="chat-messages">
//             {props.receivedMessages.map((message: IMessage, index: number) => (
//                 <div 
//                     key={index} 
//                     className={`chat-message ${message.senderId === props.userId ? 'my-message' : 'other-message'}`}
//                 >
//                     <strong>{message.senderId === props.userId ? 'Moi' : `Utilisateur ${message.senderId}`} : </strong> 
//                     {message.message}
//                 </div>
//             ))}
//         </div>
//     )
// }
export const Messages = (props: IProps) => {
    return (
        <div className="chat-messages-container">
            <div className="received-messages">
                {props.receivedMessages.map((message: IMessage, index: number) => (
                    <div 
                        key={index} 
                        className="chat-message received-message"
                    >
                        <strong>Utilisateur {message.senderId} : </strong> 
                        {message.message}
                    </div>
                ))}
            </div>

            <div className="sent-messages">
                {props.sentMessages.map((message: string, index: number) => (
                    <div 
                        key={index} 
                        className="chat-message sent-message"
                    >
                        {message}
                    </div>
                ))}
            </div>
        </div>
    );
}