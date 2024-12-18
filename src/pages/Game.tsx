/**
 * @author Raphael Caudron
 */

import React from 'react';
import { Chat } from '../components/chat/containers/Chat';
import './Game.css';
import { GameBoard } from '../components/gameboard/GameBoard';


export const Game: React.FC = () => {
    return (
        <div className="game-board-container">
            <div className="chat-section">
                <Chat interlocuteurId={1} />
            </div>
            <div className="game-section">
                <GameBoard />
            </div>
        </div>
    );
};
