import React, { useState, useEffect, useContext } from "react";
import ScoreBar from "../bars/ScoreBar";
import Card from "./Card";
import BoardIcons from "./boardIcons";
import GameFinished from "../modal/GameFinished";
import "./board.css"

const SinglePlayerBoard = ({config}) => {
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [boardIcons, setBoardIcons] = useState([]);
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(0);
    const [gameFinished, setGameFinished] = useState(false);

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
            setMoves((prev) => prev + 1);

            const [firstCard, secondCard] = newFlippedCards;

            if (firstCard.image === secondCard.image) {
                setMatchedCards([...matchedCards, firstCard.image]);
                setScore((prev) => prev + 10);
            }

            setTimeout(() => setFlippedCards([]), 1000);
        }
    };

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

    return (
        <>
            <ScoreBar score={score} moves={moves} currentPlayer={1} />
            <ul className="board-content">
                <div className="board-grid">
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
                                currentPlayer={1}
                            />
                        );
                    })}
                </div>
            </ul>

            {gameFinished && (
                <GameFinished
                isVisible={gameFinished}
                isOneVsOne={false} 
                player1Score={0}
                player2Score={0}
                score={score} 
                moves={moves}
                handleRestart={handleRestart}
                currentPlayer={1}
                />
            )}
        </>
    );
};

export default SinglePlayerBoard;