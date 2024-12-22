import React, { useState } from 'react';
import { Socket } from 'socket.io-client'; // Import de socket.io-client
import './InputChat.css';
import IMessage from '../../../types/IMessage';

interface IProps {
    socket: Socket; // On passe le socket en prop pour pouvoir l'utiliser
    senderId: number; // Id de l'utilisateur connecté
    receiverId: number | null; // Id de l'utilisateur cible
    setSentMessages: React.Dispatch<React.SetStateAction<IMessage[]>>; // Fonction pour mettre à jour les messages envoyés

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

            props.setSentMessages((prevMessages) => [
                ...prevMessages,
                {
                    message : Msg,
                    senderId: props.senderId,
                    receiverId: props.receiverId,
                    timestamp: Date.now(), // Ajoutez un timestamp valide
                },
            ]); // Met à jour les messages envoyés
            
            // Envoie le message au serveur via le socket
            props.socket.emit('SEND_MESSAGE', messageData);

            // Réinitialise le champ de saisie
            setMsg('');
        }
    };

    if (!props.receiverId) {
        return (
            <div className="chat-input-container">
                <input 
                    type="text" 
                    placeholder="Choisissez un destinataire..." 
                    value={Msg} 
                    readOnly
                />
                <button onClick={handleSendMessage2}>Envoyer</button>
            </div>
        )
    }

    return (
        <div className="chat-input-container">
            <input 
                type="text" 
                placeholder="Write a message..." 
                value={Msg} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMsg(e.target.value)} 
                onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSendMessage2()}
            />
            <button onClick={handleSendMessage2}>Send</button>
        </div>
        
    )
}