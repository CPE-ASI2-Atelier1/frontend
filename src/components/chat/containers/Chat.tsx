import React, { useContext, useEffect,useState } from 'react';
import { io, Socket } from 'socket.io-client';

import './Chat.css';
import { Messages } from '../components/Messages';
import { InputChat } from '../components/InputChat';
import IMessage from '../../../types/IMessage';
import { fetchAllUsers } from '../../../api/userService';
import { SelectReceiver } from '../components/SelectReceiver';
import IUser from '../../../types/IUser';

const SOCKET_SERVER_URL = 'http://localhost:3000'; // TODO : utiliser .env

interface IProps {
    user: IUser;
    socket: Socket;
}
export const Chat = (props:IProps) => {
    const user = props.user;
    const socket = props.socket
    
    // const messages = useSelector((state: { chat: { messages: string[] } }) => state.chat.messages); // Sélectionne les messages dans le store
    const [receivedMessages, setReceivedMessages] = useState<IMessage[]>([]); // Liste des messages reçus
    const [sentMessages, setSentMessages] = useState<string[]>([]); // Liste des messages envoyés
    // const [socket, setSocket] = useState<Socket | null>(null);
    const [receiverId, setReceiverId] = useState<number | null>(null); // Id du destinataire
    const [users, setUsers] = useState<IUser[]>([]); // Liste des utilisateurs

    const userId = user.id;

    useEffect(() => { // garde comme ça pour avoir différentes socket pour le test 
        // const newSocket = io(SOCKET_SERVER_URL);
        // const newSocket = io(SOCKET_SERVER_URL, { query: { userId } });
        // setSocket(newSocket);
        if (!socket) return;

        // socket.on("connect", () => {
        //     console.log("Connected to the server with ID:", user.id);
        //     // document.getElementById("chat").style.display = "block";
        // });
        socket.on('UPDATE_CONNECTED_USERS', (data)=> {
            setUsers(data);

            console.log(`Notification: users are loaded.`);
        });
    
        socket.on('RECEIVE_MESSAGE', (data: IMessage) => {
            setReceivedMessages((prevMessages) => [...prevMessages, data]); // Ajout du message reçu
        });

        socket.on("USER_NOT_CONNECTED", (data) => {
            setReceivedMessages((prevMessages) => [...prevMessages, data]); // Ajout du message reçu
            console.log(`Notification: The user ${data.receiverId} is not online.`);
        });

        console.log("in useEffect")
    
        // Retourne une fonction de nettoyage qui déconnecte le socket
        return () => {
            socket.off('RECEIVE_MESSAGE');
            socket.off('USER_NOT_CONNECTED');
            socket.off('UPDATE_CONNECTED_USERS')
        };
    }, [socket]);


    useEffect(() => {
        // Effacer les messages reçus et envoyés lorsque le destinataire change
        setReceivedMessages([]);
        setSentMessages([]);
    }, [receiverId]);

    return (

        <div className="chat-container">
            <h1 className="card-h1">Chat</h1>
            <SelectReceiver users={users} receiverId={receiverId} setReceiverId={setReceiverId} />
            <Messages receivedMessages={receivedMessages} sentMessages={sentMessages} userId={user.id} />

            {socket && <InputChat socket={socket} senderId={user.id} receiverId={receiverId} setSentMessages={setSentMessages}/>}
        </div>
    );
};