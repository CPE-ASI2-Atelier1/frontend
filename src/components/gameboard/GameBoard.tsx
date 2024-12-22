// noinspection LanguageDetectionInspection

import { useEffect, useState } from "react";
import IUser from "../../types/IUser.ts";
import {Board} from "./containers/Board.tsx";
import './GameBoard.css';
import "./MessageContainer.css"; 
import { GAME_ACTIONS } from '../../constants/gameActions.ts';
import { SelectCards } from "./components/SelectCards.tsx";
import { Socket } from "socket.io-client";
import { fetchCard } from "../../api/cardService.ts";
import ICard from "../../types/ICard.ts";
import { fetchUserById, updateUser } from "../../api/userService.ts";
import {submit_user_action} from "../../slices/userSlice.ts";
import {useDispatch} from "react-redux";


interface IProps{
    user: IUser;
    socket:Socket;
}
interface PendingAction {
    cardId: number;
    targetId: number;
    energyCost: number;
}
interface DamageLog {
    cardId: number;
    targetId: number;
    damage: number;
}

export const GameBoard = (props:IProps) => {

    // const dispatch = useDispatch();
    const socket = props.socket;
    const user: IUser = props.user;
    // const gameState = useSelector((state: RootState) => state.gameState); // Sélection de l'état global du plateau
    // TODO : Réféchir au store pour le gamestatre
    const dispatch = useDispatch();
    const [gameState, setGameState] = useState(0);
    //TODO : si game over que d'un coté reset pas forcement tous de l'autre faire gaffe 
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [energy, setEnergy] = useState<number>(50);
    const [enemyEnergy, setEnemyEnergy] = useState<number>(150);

    // Game logs and pending actions
    const [log, setLog] = useState<string[]>([]); // Journal des actions
    const [message, setMessage] = useState<string | null>(null); // Notification pour action interdite
    const [animate, setAnimate] = useState(false);

    /*Utilisation de useRef pour l'action en attente pour avoir l'info directement
    Alors que useState ne met à jour qu'après le rendu donc reception de
    l'événement ACTION_SUCCESS ou ACTION_FAILED avant de mettre à jour l'état 
    */
    //const pendingActionRef = useRef<PendingAction | null>(null);    
    //Crash non résolu lors de la remise à null dans le socket.on action_success donc repasse sur useState
   const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);

    // Card Selection during game to attack the card chosen
    const [selectedEnemyCard, setSelectedEnemyCard] = useState<number | null>(null);
    const [selectedPlayerCard, setSelectedPlayerCard] = useState<number | null>(null); 

    // Card Selection before game starts
    const [selectedCards, setSelectedCards] = useState<ICard[]>([]);
    const [enemyCards, setEnemyCards] = useState<ICard[]>([]);

    const [enemy, setEnemy] = useState<IUser>();
    

    useEffect(() => {
        if (!socket) return;

        // Écoute des événements uniquement de type GAME_ACTIONS
        socket.on(GAME_ACTIONS.GAME_STARTS, (enemyC) => {
            console.log('🎮 Game has started!', enemyC);
            // On refait les reinitialisation au cas où le board s'est mal reset
            setLog([]); // Réinitialiser le journal des actions
            setPendingAction(null); // Réinitialiser l'action en attente
            setIsMyTurn(false); // Réinitialiser le tour
            setEnergy(150); // Réinitialiser l'énergie
            setEnemyEnergy(150); // Réinitialiser l'énergie de l'ennemi
            handleGameStart(enemyC.cardsIds, setEnemyCards, setGameState);
        });

        socket.on(GAME_ACTIONS.START_TURN, (data) => {
            console.log('🔄 Your turn to play!');
            console.log("data", data);
            setEnergy(data.energy);
            setIsMyTurn(true);
        });

        // Écoute pour ACTION_SUCCESS
        socket.on(GAME_ACTIONS.ACTION_SUCCESS, (data) => {
            const { cardId, targetId, damage } = data;
            // Si l'action réussit, réduire l'énergie
            console.log("cardId", cardId);
            console.log("targetId", targetId);
            console.log("pendingAction", pendingAction);



            if (pendingAction && pendingAction.cardId === data.cardId) {
                // Verifications déjà faites pour l'energy
                setEnergy(pendingAction.energyCost);
                setPendingAction(null); // Réinitialisez l'action en attente
            }
            //TODO : faire verification pour les cartes si elles ont les bonnes props 
            setEnemyCards((prevCards) =>
                prevCards.map((card) =>
                    card.id === targetId
                        ? { ...card, hp: Math.max(0, card.hp! - damage) } // Réduire les HP, sans descendre sous 0
                        : card
                )
            );
            setLog((prevLog) => [...prevLog, `Action success: ${data.damage} damage dealt on card ${targetId}!`]);
        });

        // Écoute pour ACTION_FAILED
        socket.on(GAME_ACTIONS.ACTION_FAILED, (data) => {
            const { message, code } = data;
            console.log("Action failed");
            // Si l'action échoue, ne pas réduire l'énergie
            if (pendingAction) {
                setPendingAction(null); // Réinitialisez l'action en attente
            }
            setLog((prevLog) => [...prevLog, `Action failed: ${message} (Error code: ${code})`]);
        });

        socket.on(GAME_ACTIONS.RECEIVE_ACTION, (data) => {
            const {cardId, targetId, damage, energy } = data;
            console.log(`Action received: ${damage} damage on card ${targetId}`);

            // Met à jour les HP de la carte cible
            setSelectedCards((prevCards) =>
                prevCards.map((card) =>
                    card.id === targetId
                        ? { ...card, hp: Math.max(0, card.hp! - damage) } // Réduire les HP, sans descendre sous 0
                        : card
                )
            );

            // Récupérer la carte attaquante dans enemyCards et soustraire son énergie
            setEnemyEnergy(energy);
            setLog((prevLog) => [...prevLog, `Action received: ${data.damage} damage received on card ${targetId} by card ${cardId}!`]);
        });

        // socket.on(GAME_ACTIONS.END_TURN, () => {
        //     console.log('⏳ Waiting for opponent\'s turn...');
        // });

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
        
            setLog([]); // Réinitialiser le journal des actions
            setPendingAction(null); // Réinitialiser l'action en attente
            setIsMyTurn(false); // Réinitialiser le tour
            setEnergy(150); // Réinitialiser l'énergie
            setEnemyEnergy(150); // Réinitialiser l'énergie de l'ennemi
            setEnemyCards([]); // Réinitialiser les cartes de l'ennemi
            setSelectedCards([]); // Réinitialiser les cartes sélectionnées
            setSelectedEnemyCard(null); // Réinitialiser la carte ennemie sélectionnée
            setSelectedPlayerCard(null); // Réinitialiser la carte du joueur sélectionnée
            setEnemy(undefined); // Réinitialiser l'ennemy
            const money: number = data.award
            console.log('money : ',money)
            if (money > 0) {
                const newUser = { ...user, account: user.account + money };
                console.log('newUser : ',newUser)
                updateUser(newUser); // Mettre a jour l'user par requete au monolite
                dispatch(submit_user_action({ user: newUser })); // Mettre à jour l'user courant dans le store
                setGameState(5); // Le jeu est terminé
            }
            else if (data.result === 'lose') {
                console.log('test state')
                setGameState(6); // Le jeu est terminé
            }else{
                setGameState(0); // Le jeu est terminé, on remet l'état du jeu à 0
            }
        });

        return () => {
            // Nettoie tous les écouteurs d'événements
            socket.off(GAME_ACTIONS.GAME_STARTS);
            socket.off(GAME_ACTIONS.START_TURN);
            socket.off(GAME_ACTIONS.END_TURN);
            socket.off(GAME_ACTIONS.CARD_SELECTION);
            socket.off(GAME_ACTIONS.GAME_OVER);
            socket.off(GAME_ACTIONS.ACTION_SUCCESS);
            socket.off(GAME_ACTIONS.ACTION_FAILED);
            socket.off(GAME_ACTIONS.RECEIVE_ACTION);
        };
    }, [socket,pendingAction,enemyCards]);
    
    const handleGameStart = async (enemyC: number[], setEnemyCards: (cards: any[]) => void, setGameState: (state: number) => void) => {
        try {
            const cardList = await fetchCards(enemyC);
            console.log('enemy cards : ',cardList);
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

    // Fonction pour afficher un message avec animation
    const showMessage = (newMessage: string) => {
        setMessage(newMessage);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 500); // Animation dure 500ms
    };

    const startGame = () => {
        if (!socket) return;
        console.log("Lancement de la partie...");
        // Re réinitialisation des valeurs au cas où pas fait avant
        setEnemyCards([]); // Réinitialiser les cartes de l'ennemi
        setSelectedCards([]); // Réinitialiser les cartes sélectionnées
        setSelectedEnemyCard(null); // Réinitialiser la carte ennemie sélectionnée
        setSelectedPlayerCard(null); // Réinitialiser la carte du joueur sélectionnée
        setEnemy(undefined); // Réinitialiser l'ennemy
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
        console.log('Card selected to play : ',cards);
        try {
            // Attendez la réponse de fetchCards avant de procéder
            const cardList = await fetchCards(cards);
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

            // Émettez l'événement une fois que tout est prêt
            socket.emit("WAITING_CARDS", { id: Number(user.id), cards: cards2 });

            // Mettez à jour l'état du jeu
            setGameState(3);
        } catch (error) {
            console.error("Error fetching cards or updating state:", error);
            setGameState(-1);
        }
    }

    // const attack = (cardId:number, targetId:number) => {
    //     const energyCost = 20; // Exemple de coût d'énergie fixe pour une attaque
    
    //     // Vérifiez si c'est le tour de l'utilisateur
    //     if (!isMyTurn) {
    //         alert("It's not your turn!");
    //         return;
    //     }

    //     // Marquez l'action comme en attente
    //     pendingActionRef.current = { cardId, targetId, energyCost };

    //     // Émettre l'action via le socket
    //     socket.emit("SEND_ACTION", {
    //         userId: user.id,
    //         cardId,
    //         targetId,
    //     });
        
    // };
    const attack = () => {
    
        // Vérifiez si c'est le tour de l'utilisateur
        if (!isMyTurn) {
            showMessage("It's not your turn!");

            return;
        }

        if (!selectedPlayerCard || !selectedEnemyCard) {
            showMessage("Select one of your cards and a target card!");

            return;
        }

        const cardId = selectedPlayerCard!;
        const targetId = selectedEnemyCard!;

        const energyCost = selectedCards.find((card) => card.id === selectedPlayerCard)?.energy;

        if (energyCost == null) {
            console.error("The selected card does not have energy or was not found.");
            alert("The selected card does not have energy or was not found.");
            return;
        }
        
        console.log(`Energy cost of selected card: ${energyCost}`);
        const potentialNewEnergy = energy - energyCost;

        if (potentialNewEnergy < 0) {
            showMessage("Not enough energy to perform this action!");
            return;
        }

        setPendingAction({ cardId, targetId, energyCost:potentialNewEnergy });
    
        socket.emit("SEND_ACTION", {
            userId: user.id,
            cardId,
            targetId
        });

        // Réinitialise le message en cas de succès
        setMessage(null);
        console.log(`Attacking with Card ${cardId} targeting Card ${targetId}`);
    };

    const endTurn = () =>{
        if (!isMyTurn) {
            showMessage("You can't end your turn now!");
            return;
        }

        setEnemyEnergy(enemyEnergy + 150);
        setMessage(null);

        socket.emit("END_TURN", { id: Number(user.id) });
        setIsMyTurn(false);
    }

    if (!user) {
        return <div>Vous devez être connecté pour accéder au jeu</div>;
    }

    //TODO : switch case
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
                <Board user={enemy} cards={enemyCards} energy={enemyEnergy}
                onCardSelection={setSelectedEnemyCard}
                />
            </div> 
            <div className="end-turn-container">
                <button onClick={endTurn}>End Turn</button>
                <span className="turn-indicator">
                    {isMyTurn ? "Your turn" : "Opponent's turn"}
                </span>
                <button 
                onClick={attack} 
                // disabled={!selectedPlayerCard || !selectedEnemyCard}>
                >
                    Attack (costs the card's energy)
                </button>

                {message && (
                    <div className={`message-container ${animate ? "highlight" : ""}`}>
                        <div className="message">{message}</div>
                    </div>
                )}
                <div className="log-container">
                    <h3>Action Log</h3>
                    <ul>
                        {log.map((entry, index) => (
                            <li key={index}>{entry}</li>
                        ))}
                    </ul>
                </div>

            </div>
            <div className="row">
                <Board user={user} cards={selectedCards} energy={energy} 
                onCardSelection={setSelectedPlayerCard}
                />
            </div>
        </div>
    )}
    if (gameState === 5) {
        return (
            <div className="gameboard-container">
                <div className="end-game-container">
                    <h1>Vous avez gagné ! Allez voir votre compte</h1>
                    <button onClick={startGame} className="start-game-button">Play Again</button>
                </div>
            </div>
        );
    }
    if (gameState === 6) {
        return (
            <div className="gameboard-container">
                <div className="end-game-container">
                    <h1>Game Over!</h1>
                    <button onClick={startGame} className="start-game-button">Play Again</button>
                </div>
            </div>
        );
    }
    return (
        <div className="error-message">
            Problem with the gameboard state pls refresh
        </div>
    );


}