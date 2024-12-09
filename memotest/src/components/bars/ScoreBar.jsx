import React from "react";
import "./scoreBar.css"; 

const ScoreBar = ({ score, moves }) => {
    return (
        <div className="score-bar">
            <div className="score-item">Score: {score}</div>
            <div className="score-item">Moves: {moves}</div>
        </div>
    );
};

export default ScoreBar;
