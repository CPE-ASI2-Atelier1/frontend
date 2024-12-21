import { useEffect, useState } from "react";

import IUser from "../../types/IUser.ts";
import {Board} from "./containers/Board.tsx";
import './GameBoard.css';
import { GAME_ACTIONS } from '../../constants/gameActions.ts';
import { SelectCards } from "./components/SelectCards.tsx";
import { Socket } from "socket.io-client";
import { fetchCard } from "../../api/cardService.ts";
import ICard from "../../types/ICard.ts";
import { fetchUserById } from "../../api/userService.ts";

interface IProps{
    user: IUser;
    socket:Socket;
}

export const GameBoard = (props:IProps) => {

    // const dispatch = useDispatch();
    const socket = props.socket;
    // const gameState = useSelector((state: RootState) => state.gameState); // Sélection de l'état global du plateau
    const [gameState, setGameState] = useState(0);
    //changer le gamestate dans un store pour eviter que quand on par et revient ça part
    const [selectedCards, setSelectedCards] = useState<ICard[]>([]);
    const [enemyCards, setEnemyCards] = useState<ICard[]>([]);
    const [enemy, setEnemy] = useState<IUser>();

    const user = props.user;

    useEffect(() => {
        if (!socket) return;

        // Écoute des événements uniquement de type GAME_ACTIONS
        socket.on(GAME_ACTIONS.GAME_STARTS, (enemyC) => {
            console.log('🎮 Game has started!', enemyC);
            // TODO enlever les 2, enemyId sera le seul envoyé
            handleGameStart(enemyC.cardsIds, setEnemyCards, setGameState);
        });

        socket.on(GAME_ACTIONS.START_TURN, () => {
            console.log('🔄 Your turn to play!');
        });

        socket.on(GAME_ACTIONS.END_TURN, () => {
            console.log('⏳ Waiting for opponent\'s turn...');
        });

        socket.on(GAME_ACTIONS.CARD_SELECTION, (data) => {
            console.log('🃏 Select your cards!', data);
            if(data.userId)
                {handleEnemyUser(data.userId);}
            else{
                handleEnemyUser(data.enemyId);
            }
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
    const handleGameStart = async (enemyC: number[], setEnemyCards: (cards: any[]) => void, setGameState: (state: number) => void) => {
        try {
            console.log(enemyC)
            const cardList = await fetchCards(enemyC);
            console.log(cardList);
            setEnemyCards(cardList);
            setGameState(4);
        } catch (error) {
            console.error("Error fetching enemy cards:", error);
            setGameState(-1);
        }
    };

    const handleEnemyUser = async (enemyId:  number) => {
        console.log("enemyId", enemyId);
        try {
            const enemy = await fetchUserById(enemyId);
            setEnemy(enemy);
        } catch (error) {
            console.error("Error setting enemy user:", error);
            setGameState(-1);
        }
    }
    const endTurn = () => {
        console.log("fin du tour");
    }

    const startGame = () => {
        if (!socket) return;
        console.log("Lancement de la partie...");
        socket.emit(GAME_ACTIONS.WAITING_PLAYER, { id: user.id });
        setGameState(1);
    }

    const fetchCards = async (cards: number[]) => {
        let cardList = [];
        for (let i = 0; i < cards.length; i++) {
            const card = await fetchCard(cards[i]);
            cardList.push(card);
        }

        return cardList;
    }

    const cardsSelection = async (cards: number[]) => {
        console.log(cards);
        try {
            // Attendez la réponse de fetchCards avant de procéder
            const cardList = await fetchCards(cards);
            console.log(cardList);
            setSelectedCards(cardList);
    
            // Créez cards2 à partir de cardList après l'appel asynchrone
            const cards2 = cardList.map(({ id, attack, defence, energy, name, hp }) => ({
                id,
                attack,
                defence,
                energy,
                name,
                hp,
            }));
    
            console.log(cards2);
    
            // Émettez l'événement une fois que tout est prêt
            socket.emit("WAITING_CARDS", { id: Number(user.id), cards: cards2 });
    
            // Mettez à jour l'état du jeu
            setGameState(3);
        } catch (error) {
            console.error("Error fetching cards or updating state:", error);
            setGameState(-1);
        }
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
                    <SelectCards cardIds={user.cardList} cardsAreSelected={cardsSelection}/>
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
    if (gameState === 4 && enemy) {
        return (
        <div className="gameboard-container">
            <div className="row">
                <Board user={enemy} cards={enemyCards}/>
            </div> 
            <div className="end-turn-container">
                <button onClick={endTurn}>End Turn</button>
            </div>
            <div className="row">
                <Board user={user} cards={selectedCards}/>
            </div>
        </div>
    )}
    return (
        <div>
            Problem with the gameboard state pls refresh
        </div>
    );
    

}