import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client'; // Import de socket.io-client

interface IProps {
    socket: Socket; // On passe le socket en prop pour pouvoir l'utiliser
    senderId: number; // Id de l'utilisateur connecté
    receiverId: number | null; // Id de l'utilisateur cible
    setSentMessages: React.Dispatch<React.SetStateAction<string[]>>; // Fonction pour mettre à jour les messages envoyés
}

//const SOCKET_SERVER_URL = 'http://localhost:3000'; // Remplace par l'URL de ton serveur

//let socket: Socket;

export const InputChat =(props: IProps)=> {

    const [Msg, setMsg] = useState<string>('')

    const handleSendMessage2 = () => {
        if (Msg.trim() !== '') {
            const messageData = {
                senderId: props.senderId, 
                receiverId: props.receiverId, // Exemple d'utilisateur cible (personnalisable)
                message: Msg
            };

            props.setSentMessages((prevMessages) => [...prevMessages, Msg]); // Met à jour les messages envoyés
            
            // Envoie le message au serveur via le socket
            props.socket.emit('SEND_MESSAGE', messageData);

            // Réinitialise le champ de saisie
            setMsg('');
        }
    };

    return (
        <div className="chat-input-container">
            <input 
                type="text" 
                placeholder="Écrivez un message..." 
                value={Msg} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMsg(e.target.value)} 
                onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSendMessage2()}
            />
            <button onClick={handleSendMessage2}>Envoyer</button>
        </div>
        
    )
}