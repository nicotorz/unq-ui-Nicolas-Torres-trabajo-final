import React, { useContext } from "react";
import {ConfigContext} from "../../hooks/ConfigContext";
import SinglePlayerBoard from "../board/SinglePlayerBoard";
import { useNavigate } from "react-router-dom";
import TwoPlayersBoard from "../board/TwoPlayersBoard";
import './boardGame.css'

const Board = () => {
    const { config } = useContext(ConfigContext);
    const navigation = useNavigate();
    
    const handleBackToMenu = () => {
        navigation("/Menu");
    };

    return (
        <div className="game-board">
            {config.mode === "solo" ? (
                <SinglePlayerBoard config={config}/>
            ) : config.mode === "1vs1" ? (
                <TwoPlayersBoard config={config}/>
            ) : (
                <div className="noBoard">
                    <p>Please select a mode to start the game.</p>
                    <button onClick={handleBackToMenu}>Back to Menu</button>
                </div>
            )}
        </div>
    );
};

export default Board;