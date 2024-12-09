import React from "react";
import { useNavigate } from "react-router-dom";
import "./gameFinishedModal.css";

const GameFinished = ({ isVisible, isOneVsOne, player1Score, player2Score, score, moves, handleRestart}) => {
    const navigation = useNavigate();

    const handleBackToMenu = () => {
        navigation("/Menu");
    };

    if (!isVisible) return null;

    const winner =
        isOneVsOne &&
        (player1Score === player2Score
            ? "¡TIE!"
            : player1Score > player2Score
            ? "¡Winner: Blue Player!"
            : "¡Winner: Red Player!");

    return (
        <div className="game-finished-modal">
            <div className="modal-content">
                <h2>¡Game finished!</h2>
                {isOneVsOne ? (
                    <>
                        <p>Blue Player: {player1Score}</p>
                        <p>Red Player: {player2Score}</p>
                        <h3>{winner}</h3>
                    </>
                ) : (
                    <p>
                        Score: {(score / moves).toFixed(1)} / 10
                    </p>
                )}
                <div className="modal-buttons">
                    <button onClick={handleRestart}>Play Again</button>
                    <button onClick={handleBackToMenu}>Back to Menu</button>
                </div>
            </div>
        </div>
    );
};

export default GameFinished;