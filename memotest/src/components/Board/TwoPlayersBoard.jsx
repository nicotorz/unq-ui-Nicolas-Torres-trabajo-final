import React, { useState, useEffect } from "react";
import ScoreBar from "../bars/ScoreBar";
import Card from "./Card";
import BoardIcons from "./boardIcons";
import GameFinished from "../modal/GameFinished";
import "./board.css"

const TwoPlayersBoard = ({ config }) => {
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [boardIcons, setBoardIcons] = useState([]);
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState(1); 
    const [moves, setMoves] = useState(0);
    const [gameFinished, setGameFinished] = useState(false);

    useEffect(() => {
        const iconsToUse = BoardIcons.slice(0, config.boardSize)
            .flatMap((image) => [image, image])
            .sort(() => Math.random() - 0.5);

        setBoardIcons(iconsToUse);
    }, [config.boardSize]);

    useEffect(() => {
        if (boardIcons.length > 0 && matchedCards.length === boardIcons.length / 2) {
            setGameFinished(true);
        }
    }, [matchedCards, boardIcons]);

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
                if (currentPlayer === 1) {
                    setPlayer1Score(player1Score + 10);
                } else {
                    setPlayer2Score(player2Score + 10);
                }
                setTimeout(() => {
                    setFlippedCards([]);
                }, 1000);
            } else {
                setTimeout(() => {
                    setFlippedCards([]);
                    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
                }, 1000);
            }
        }
        console.log(currentPlayer)
    };

    const handleRestart = () => {
        setFlippedCards([]);
        setMatchedCards([]);
        setBoardIcons([]);
        setPlayer1Score(0);
        setPlayer2Score(0);
        setMoves(0);
        setGameFinished(false);
        setCurrentPlayer(1);

        const iconsToUse = BoardIcons.slice(0, config.boardSize)
            .flatMap((image) => [image, image])
            .sort(() => Math.random() - 0.5);

        setBoardIcons(iconsToUse);
    };

    return (
        <>
            <ScoreBar score={currentPlayer === 1 ? player1Score : player2Score} moves={moves} currentPlayer={currentPlayer} />
            <ul className="board-content">
                <div className={`${
                                config.boardSize === 8
                                    ? "board-grid-4x4"
                                    : config.boardSize === 18
                                    ? "board-grid-6x6"
                                    : "board-grid-8x8"
                                }`}>
                    {boardIcons.map((image, index) => {
                        const uniqueKey = `${image}-${index}`;
                        return (
                            <Card
                                key={uniqueKey}
                                image={image}
                                uniqueKey={uniqueKey}
                                handleCardClick={handleCardClick}
                                flippedCards={flippedCards}
                                matchedCards={matchedCards}
                                currentPlayer={currentPlayer}
                            />
                        );
                    })}
                </div>
            </ul>

            {gameFinished && (
                <GameFinished
                isVisible={gameFinished}
                isOneVsOne={true} 
                player1Score={player1Score}
                player2Score={player2Score}
                score={0} 
                moves={moves}
                handleRestart={handleRestart}
                />
            )}
        </>
    );
};

export default TwoPlayersBoard;