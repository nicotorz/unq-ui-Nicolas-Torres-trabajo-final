import React from "react";
import "./scoreBar.css";

const ScoreBar = ({ score, moves, currentPlayer }) => {
    const playerColors = {
        1: "#304D6D", 
        2: "#6d3030", 
    };

    return (
        <div
            className="score-bar"
            style={{ backgroundColor: playerColors[currentPlayer] }}
        >
            <div className="score-item">Player: {currentPlayer === 1 ? "Blue" : "Red"}</div>
            <div className="score-item">Score: {score}</div>
            <div className="score-item">Moves: {moves}</div>
        </div>
    );
};

export default ScoreBar;