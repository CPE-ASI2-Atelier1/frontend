import React, { useEffect,useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { useSelector } from 'react-redux';
import './Chat.css';
import { Messages } from '../components/Messages';
import { InputChat } from '../components/InputChat';
import { RootState } from '../../../store';
import IMessage from '../../../types/IMessage';
import { fetchAllUsers } from '../../../api/userService';
import { SelectReceiver } from '../components/SelectReceiver';
import IUser from '../../../types/IUser';

const SOCKET_SERVER_URL = 'http://localhost:3000'; // TODO : utiliser .env

interface IProps {
    interlocuteurId: number;
}

export const Chat = (props:IProps) => {
    const user = useSelector((state:RootState) => state.user.user); // Sélectionne l'id de l'utilisateur dans le store
    
    // const messages = useSelector((state: { chat: { messages: string[] } }) => state.chat.messages); // Sélectionne les messages dans le store
    const [receivedMessages, setReceivedMessages] = useState<IMessage[]>([]); // Liste des messages reçus
    const [sentMessages, setSentMessages] = useState<string[]>([]); // Liste des messages envoyés
    const [socket, setSocket] = useState<Socket | null>(null);
    const [receiverId, setReceiverId] = useState<number | null>(null); // Id du destinataire
    const [users, setUsers] = useState<IUser[]>([]); // Liste des utilisateurs

    // IO : connecter au serveur node par websocket
    // IO.onReceive (lui donner la méthode handleReceiveMessage)
    // fetch gars en entiers IUser ?

    if (!user) {
        return <div>Vous devez être connecté pour accéder au chat</div>;
    }

    const userId = user.id;

    useEffect(() => {
        // const newSocket = io(SOCKET_SERVER_URL);
        const newSocket = io(SOCKET_SERVER_URL, { query: { userId } });

        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Connected to the server with ID:", user.id);
            // document.getElementById("chat").style.display = "block";
        });
    
        newSocket.on('RECEIVE_MESSAGE', (data: IMessage) => {
            setReceivedMessages((prevMessages) => [...prevMessages, data]); // Ajout du message reçu
        });

        newSocket.on("USER_NOT_CONNECTED", (data) => {
            setReceivedMessages((prevMessages) => [...prevMessages, data]); // Ajout du message reçu
            console.log(`Notification: The user ${data.receiverId} is not online.`);
        });
    
        // Retourne une fonction de nettoyage qui déconnecte le socket
        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetchAllUsers();
                setUsers(response); // Stocke les utilisateurs récupérés dans le state
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
            }
        };

        fetchUsers();
    }, []);

    return (

        <div className="chat-container">
            <h2>Chat</h2>
            <SelectReceiver users={users} receiverId={receiverId} setReceiverId={setReceiverId} />
            <Messages receivedMessages={receivedMessages} sentMessages={sentMessages} userId={user.id} />

            {socket && <InputChat socket={socket} senderId={user.id} receiverId={receiverId} setSentMessages={setSentMessages}/>}
        </div>
    );
};