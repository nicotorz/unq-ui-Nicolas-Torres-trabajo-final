import "./board.css";
import ScoreBar from "../bars/scoreBar";
import { useState, useContext, useEffect } from "react";
import { ConfigContext  } from '../../hooks/ConfigContext';
import { useNavigate } from 'react-router-dom'
import BoardIcons from "./boardIcons";

const Board = () => {
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [boardIcons, setBoardIcons] = useState([]);
    const [score, setScore] = useState(0); 
    const [moves, setMoves] = useState(0);
    const [gameFinished, setGameFinished] = useState(false);  
    const { config } = useContext(ConfigContext)
    const navigation = useNavigate();

    useEffect(() => {
        const iconsToUse = BoardIcons.slice(0, config.boardSize)
            .flatMap((image) => [image, image]) 
            .sort(() => Math.random() - 0.5); 
    
        setBoardIcons(iconsToUse); 
    }, []);
    
    useEffect(() => {
        if (boardIcons.length > 0 && matchedCards.length === boardIcons.length / 2) {
            setGameFinished(true);
        }
    }, [matchedCards, boardIcons])
    

    const handleCardClick = (image, uniqueKey) => {
        if (
            flippedCards.length === 2 || 
            matchedCards.includes(image) || 
            flippedCards.some((card) => card.uniqueKey === uniqueKey) 
        ) {
            return;
        }

        const newFlippedCards = [...flippedCards, { image, uniqueKey }];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setMoves(moves + 1);

            const [firstCard, secondCard] = newFlippedCards;

            if (firstCard.image === secondCard.image) {
                setMatchedCards([...matchedCards, firstCard.image]);
                setScore(score + 10); 
            }

            setTimeout(() => setFlippedCards([]), 1000);
        }
    }

    const handleRestart = () => {
        setFlippedCards([]);
        setMatchedCards([]);
        setBoardIcons([]);
        setScore(0);
        setMoves(0);
        setGameFinished(false);

        const iconsToUse = BoardIcons.slice(0, config.boardSize)
            .flatMap((image) => [image, image])
            .sort(() => Math.random() - 0.5);
        setBoardIcons(iconsToUse);
    };

    const handleBackToMenu = () => {
        navigation('/Menu')
    }

    return (
        <>
            <ScoreBar score={score} moves={moves} />
            <ul className="board-content">
                <div className="board-grid">
                    {boardIcons.map((image, index) => {
                        const uniqueKey = `${image}-${index}`;
                        return (
                            <li
                                key={uniqueKey}
                                className={`board-item ${
                                    flippedCards.some((card) => card.uniqueKey === uniqueKey) ||
                                    matchedCards.includes(image)
                                        ? "flipped"
                                        : ""
                                }`}
                                onClick={() => handleCardClick(image, uniqueKey)}
                            >
                                <div className="card">
                                    <div className="card-front">?</div>
                                    <div className="card-back">
                                        <img alt="icon" src={image} />
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </div>
            </ul>

            {gameFinished && (
                <div className="game-finished-modal">
                    <div className="modal-content">
                        <h2>¡Game finished!</h2>
                        <p>Score: {(score / moves).toFixed(1)} / 10</p>
                        <div className="modal-buttons">
                            <button onClick={handleRestart}>Play Again</button>
                            <button onClick={handleBackToMenu}>Back to Menu</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Board;