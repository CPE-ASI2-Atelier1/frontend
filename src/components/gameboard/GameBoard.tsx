import { useEffect, useState } from "react";
import IUser from "../../types/IUser.ts";
import {Board} from "./containers/Board.tsx";
import './GameBoard.css';
import { GAME_ACTIONS } from '../../constants/gameActions.ts';
import { SelectCards } from "./components/SelectCards.tsx";
import { Socket } from "socket.io-client";
import ICard from "../../types/ICard.ts";

interface IProps{
    user: IUser;
    socket:Socket;
}

export const GameBoard = (props:IProps) => {

    // const dispatch = useDispatch();
    const socket = props.socket;
    const user: IUser = props.user;
    // const gameState = useSelector((state: RootState) => state.gameState); // Sélection de l'état global du plateau
    const [gameState, setGameState] = useState(0);
    //changer le gamestate dans un store pour eviter que quand on par et revient ça part
    const [selectedCards, setSelectedCards] = useState<number[]>([]);

    // useEffect(() => {
    //     // Mise à jour de l'état général du plateau à 1 (jeu en cours)
    //     dispatch({ type: 'UPDATE_GAME_STATE', payload: 1 });

    //     // Cleanup: remettre à 0 lorsqu'on quitte le composant
    //     return () => {
    //         dispatch({ type: 'UPDATE_GAME_STATE', payload: 0 });
    //     };
    // }, [dispatch]);

    useEffect(() => {
        if (!socket) return;

        // Écoute des événements uniquement de type GAME_ACTIONS
        socket.on(GAME_ACTIONS.GAME_STARTS, (data) => {
            console.log('🎮 Game has started!', data);
            setGameState(3); // Indique que la partie a commencé
        });

        socket.on(GAME_ACTIONS.START_TURN, () => {
            console.log('🔄 Your turn to play!');
        });

        socket.on(GAME_ACTIONS.END_TURN, () => {
            console.log('⏳ Waiting for opponent\'s turn...');
        });

        socket.on(GAME_ACTIONS.CARD_SELECTION, (data) => {
            console.log('🃏 Select your cards!', data);
            setGameState(2);
        });

        socket.on(GAME_ACTIONS.GAME_OVER, (data) => {
            console.log('❌ Game over!', data);
            setGameState(0); // Le jeu est terminé, on remet l'état du jeu à 0
        });

        return () => {
            // Nettoie tous les écouteurs d'événements
            socket.off(GAME_ACTIONS.GAME_STARTS);
            socket.off(GAME_ACTIONS.START_TURN);
            socket.off(GAME_ACTIONS.END_TURN);
            socket.off(GAME_ACTIONS.CARD_SELECTION);
            socket.off(GAME_ACTIONS.GAME_OVER);
        };
    }, [socket]);
    
    let cards = [];
    for (let i = 0; i < 5; i++) {
        cards.push([1,2,3,4,5]);
    }

    const userExample:IUser= {
        id: 12,
        login: "exemple",
        lastName: "nom",
        surName: "prenom",
        email: "email",
        account: 17,
        cardList: cards
    }

    // TODO : faire cette fonction pour qu'elle envoie fin du tour au serveur 
    const endTurn = () => {
        console.log("fin du tour");
    }

    const next = (selectedCards : ICard[]) => {
        // Send selected cards to server
        socket.emit("WAITING_CARDS", { id: Number(user.id), cards: selectedCards });
        console.log(`User ${user.id} selected cards:`, selectedCards);
    }

    const startGame = () => {
        if (!socket) return;
        console.log("Lancement de la partie...");
        socket.emit(GAME_ACTIONS.WAITING_PLAYER, { id: user.id });
        setGameState(1);
    }

    const cardsSelection = (cards: number[]) => {
        console.log(cards);
        setSelectedCards(cards);
        setGameState(3);
    }

    if (!user) {
        return <div>Vous devez être connecté pour accéder au jeu</div>;
    }

    if (gameState === 0) {
        return (
            <div className="gameboard-container">
                <button onClick={startGame} className="start-game-button">Start Game</button>
            </div>
        );
    }
    
    if (gameState === 1) {
        return (
            <div className="ui segment">
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Waiting for player</div>
                </div>
                <p></p>
            </div>
        )
    }

    if (gameState === 2) {
        return (
                <div>
                    <SelectCards cards={user.cardList} setSelectedCards={cardsSelection}/>
                </div>
        )
    }
    if (gameState === 3){
        return (
            <div className="ui segment">
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Waiting for player to select their cards</div>
                </div>
                <p></p>
            </div>
        )
    }
    return (
        <div className="gameboard-container">
            <div className="row">
                <Board user={userExample} />
            </div> 
            <div className="end-turn-container">
                <button onClick={endTurn}>End Turn</button>
            </div>
            <div className="row">
                <Board user={user} />
            </div>
        </div>
    )
}