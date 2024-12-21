/**
 * @author Raphael Caudron
 */

import React, { useEffect, useState } from 'react';
import { Chat } from '../components/chat/containers/Chat';
import './Game.module.css';
import { GameBoard } from '../components/gameboard/GameBoard';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { io, Socket } from 'socket.io-client';
import IUser from '../types/IUser';

const SOCKET_SERVER_URL = 'http://localhost:3000';
// TODO utiliser .env


export const Game: React.FC = () => {
    const user = useSelector((state:RootState) => state.user.user); // Sélectionne l'id de l'utilisateur dans le store
    const [users, setUsers] = useState<IUser[]>([]); // Liste des utilisateurs
    const [socket, setSocket] = useState<Socket>();

    if (!user) {
        return <div>Vous devez être connecté pour accéder au jeu</div>;
    }
    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL, { query: { userId: user.id, userName:user.login} }); // ⚠️ Remplace par la bonne logique d'utilisateur
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("✅ Connected to the server");
        });
            
        // newSocket.on('RECEIVE_MESSAGE', (data: IMessage) => {
        //     setReceivedMessages((prevMessages) => [...prevMessages, data]); // Ajout du message reçu
        // });

        // newSocket.on("USER_NOT_CONNECTED", (data) => {
        //     setReceivedMessages((prevMessages) => [...prevMessages, data]); // Ajout du message reçu
        //     console.log(`Notification: The user ${data.receiverId} is not online.`);
        // });

        // // Écoute des événements uniquement de type GAME_ACTIONS
        // newSocket.on(GAME_ACTIONS.GAME_STARTS, (data) => {
        //     console.log('🎮 Game has started!', data);
        //     setGameState(3); // Indique que la partie a commencé
        // });

        // newSocket.on(GAME_ACTIONS.START_TURN, () => {
        //     console.log('🔄 Your turn to play!');
        // });

        // newSocket.on(GAME_ACTIONS.END_TURN, () => {
        //     console.log('⏳ Waiting for opponent\'s turn...');
        // });

        // newSocket.on(GAME_ACTIONS.CARD_SELECTION, (data) => {
        //     console.log('🃏 Select your cards!', data);
        //     setGameState(2);
        // });

        // newSocket.on(GAME_ACTIONS.GAME_OVER, (data) => {
        //     console.log('❌ Game over!', data);
        //     setGameState(0); // Le jeu est terminé, on remet l'état du jeu à 0
        // });

        return () => {
            newSocket.disconnect();
        };
        
    }, [user]);

    if(socket){
    return (
        <div className="game-board-container">
            <div className="chat-section">
                <Chat user={user} socket={socket}/>
            </div>
            <div className="game-section">
                <GameBoard user={user} socket={socket}/>
            </div>
        </div>
    );}
    else{
        return(<div>
            Unable to connect to the socket
        </div>)
    }
};