import React, { useContext } from "react";
import {ConfigContext} from "../../hooks/ConfigContext";
import SinglePlayerBoard from "../board/SinglePlayerBoard";
import TwoPlayersBoard from "../board/TwoPlayersBoard";

const Board = () => {
    const { config } = useContext(ConfigContext);

    return (
        <div className="game-board">
            {config.mode === "solo" ? (
                <SinglePlayerBoard config={config}/>
            ) : config.mode === "1vs1" ? (
                <TwoPlayersBoard config={config}/>
            ) : (
                <p>Please select a mode to start the game.</p>
            )}
        </div>
    );
};

export default Board;