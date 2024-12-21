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
    const [gameState, setGameState] = useState(0);
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [energy, setEnergy] = useState<number>(100);
    // Game logs and pending actions
    const [log, setLog] = useState<string[]>([]); // Journal des actions
    const [damageLog, setDamageLog] = useState<DamageLog[]>([]); // Historique des dégâts
    const [pendingAction, setPendingAction] = useState<PendingAction | null>(null); // Action en attente
    // TODO : Réféchir au store pour le gamestatre
    const [selectedCards, setSelectedCards] = useState<ICard[]>([]);
    const [enemyCards, setEnemyCards] = useState<ICard[]>([]);

    const [enemy, setEnemy] = useState<IUser>();

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
            setIsMyTurn(true);
        });

        // Écoute pour ACTION_SUCCESS
        socket.on(GAME_ACTIONS.ACTION_SUCCESS, (data) => {
            const { cardId, targetId, damage } = data;

            // Si l'action réussit, réduire l'énergie
            if (pendingAction && pendingAction.cardId === cardId) {
                setEnergy((prevEnergy) => prevEnergy - pendingAction.energyCost);
                setPendingAction(null); // Réinitialiser l'action en attente
            }

            setLog((prevLog) => [...prevLog, `Action successful: Card ${cardId} attacked Target ${targetId} for ${damage} damage.`]);
            setDamageLog((prevLog) => [...prevLog, { cardId, targetId, damage }]);
        });

        // Écoute pour ACTION_FAILED
        socket.on(GAME_ACTIONS.ACTION_FAILED, (data) => {
            const { message, code } = data;

            // Si l'action échoue, ne pas réduire l'énergie
            if (pendingAction) {
                setPendingAction(null); // Réinitialiser l'action en attente
            }

            setLog((prevLog) => [...prevLog, `Action failed: ${message} (Error code: ${code})`]);
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
            socket.off(GAME_ACTIONS.ACTION_SUCCESS);
            socket.off(GAME_ACTIONS.ACTION_FAILED);
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

    const attack = (cardId:number, targetId:number) => {
        const energyCost = 20; // Exemple de coût d'énergie fixe pour une attaque

        // Vérifiez si c'est le tour de l'utilisateur
        if (!isMyTurn) {
            alert("It's not your turn!");
            return;
        }

        // Émettre l'action via le socket
        socket.emit("SEND_ACTION", {
            userId: user.id,
            cardId,
            targetId,
        });

        // Marquez l'action comme en attente
        setPendingAction({ cardId, targetId, energyCost });
    };

    const endTurn = () =>{
        if (!isMyTurn) {
            alert("You can't end your turn now!");
            return;
        }

        socket.emit("END_TURN", { id: Number(user.id) });
        setIsMyTurn(false);
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
                <Board user={enemy} cards={enemyCards} energy={energy}/>
            </div> 
            <div className="end-turn-container">
                <button onClick={endTurn}>End Turn</button>
                <span className="turn-indicator">
                    {isMyTurn ? "Your turn" : "Opponent's turn"}
                </span>
                <button onClick={() => attack(6, 1)}>
                    Attack
                </button>
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
                <Board user={user} cards={selectedCards} energy={energy}/>
            </div>
        </div>
    )}
    return (
        <div>
            Problem with the gameboard state pls refresh
        </div>
    );


}