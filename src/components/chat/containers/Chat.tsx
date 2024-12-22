import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import "./Chat.css";
import { Messages } from "../components/Messages";
import { InputChat } from "../components/InputChat";
import IMessage from "../../../types/IMessage";
import { SelectReceiver } from "../components/SelectReceiver";
import IUser from "../../../types/IUser";

interface Message {
    sender: number;
    message: string;
}
interface User {
    id: number;
    name: string;
}

interface IProps {
    user: IUser;
    socket: Socket;
}

export const Chat = (props: IProps) => {
    const user = props.user;
    const socket = props.socket;

    const [receivedMessages, setReceivedMessages] = useState<IMessage[]>([]); // Liste des messages reçus
    const [sentMessages, setSentMessages] = useState<string[]>([]); // Liste des messages envoyés
    const [receiverId, setReceiverId] = useState<number | null>(null); // Id du destinataire
    const [users, setUsers] = useState<User[]>([]); // Liste des utilisateurs
    const [receiverName, setReceiverName] = useState<string | null>(null); // Nom du destinataire sélectionné

    useEffect(() => {
        if (!socket) return;

        // Met à jour la liste des utilisateurs connectés
        socket.on("UPDATE_CONNECTED_USERS", (data: User[]) => {
            const filteredUsers = data.filter((userReceived) => userReceived.id !== user.id); // Exclut l'utilisateur courant
            setUsers(filteredUsers);
            console.log(`Notification: users are loaded, excluding current user.`);
        });

        socket.on("ON_USER_SELECTED", (data: { participants: User[]; messages: Message[]; receiverName: string }) => {
            console.log(`Chat history received for conversation with ${data.receiverName}`);
            setReceiverName(data.receiverName); // Met à jour le nom du destinataire
        
            // Filtrer les messages en fonction du senderId
            const sent = data.messages.filter((message) => message.sender === user.id); // Messages envoyés par l'utilisateur courant
            
            const receivedIM = data.messages
                .filter((message) => message.sender !== user.id) // Messages reçus
                .map((message) => ({
                    senderId: message.sender,
                    message: message.message,
                    timestamp: new Date().toISOString(), // Add a timestamp
                }));
            console.log('data received  : ',sent)

            setSentMessages(sent.map((msg) => msg.message)); // Met à jour les messages envoyés
            
            setReceivedMessages(receivedIM); // Met à jour les messages reçus
        });

        socket.on("RECEIVE_MESSAGE", (data: IMessage) => {
            // if (receiverId === 0) {
            //     setReceivedMessages((prevMessages) => [...prevMessages, data]); // Ajoute le message reçu
            // }else if(receiverId === data.senderId){
            //     setReceivedMessages((prevMessages) => [...prevMessages, data]); // Ajoute le message reçu
            // }
            console.log('data received  : ',data)
            console.log('receiverId  : ',receiverId)
            if(receiverId === data.senderId){
                setReceivedMessages((prevMessages) => [...prevMessages, data]); // Ajoute le message reçu
            }
        });

        socket.on("USER_NOT_CONNECTED", (data) => {
            console.log(`Notification: The user ${data.receiverId} is not online.`);
        });

        return () => {
            socket.off("UPDATE_CONNECTED_USERS");
            socket.off("ON_USER_SELECTED");
            socket.off("RECEIVE_MESSAGE");
            socket.off("USER_NOT_CONNECTED");
        };
    }, [socket, user.id, receiverId]);

    // Efface les messages affichés et demande l'historique lorsque le destinataire change
    useEffect(() => {
        if (receiverId || receiverId === 0) {
            setReceivedMessages([]);
            setSentMessages([]);
            console.log(`Requesting chat history with user ${receiverId}`);

            if (receiverId == 0){
                socket.emit("ON_USER_SELECT", { senderId: user.id, receiverId:"0" }); // Demande l'historique des messages
            }
            else{
                socket.emit("ON_USER_SELECT", { senderId: user.id, receiverId:receiverId }); // Demande l'historique des messages

            }
        }
    }, [receiverId]);

    return (
        <div className="chat-container">
            <h1 className="card-h1">Chat</h1>
            <SelectReceiver users={users} receiverId={receiverId} setReceiverId={setReceiverId} />
            {receiverName && <h2>Chat with {receiverName}</h2>}
            <Messages
                receivedMessages={receivedMessages}
                sentMessages={sentMessages}
                userId={user.id}
            />
            {socket && (
                <InputChat
                    socket={socket}
                    senderId={user.id}
                    receiverId={receiverId}
                    setSentMessages={setSentMessages}
                />
            )}
        </div>
    );
};
