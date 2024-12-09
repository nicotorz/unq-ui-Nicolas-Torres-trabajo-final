import { useState, useContext  } from "react";
import { useNavigate } from "react-router";
import { ConfigContext  } from '../../hooks/ConfigContext';
import "./menu.css";

const Menu = () => {
    const [boardSize, setBoardSize] = useState(4);
    const [mode, setMode] = useState("solo");
    const navigate = useNavigate();
    const { setConfig } = useContext(ConfigContext)

    const handleStart = () => {
        setConfig({ boardSize, mode });
        navigate(`/Game`);
    };

    return (
        <div className="main-container">
            <div className="menu-container">
                <h1>Memotest</h1>

                <div className="option-container">
                    <button
                        className={`menu-btn ${mode === "solo" ? "selected" : ""}`}
                        onClick={() => setMode("solo")}
                    >
                        Play Solo
                    </button>
                    <button
                        className={`menu-btn ${mode === "2vs2" ? "selected" : ""}`}
                        onClick={() => setMode("2vs2")}
                    >
                        1 vs 1
                    </button>
                </div>

                <div className="option-container">
                    <label htmlFor="boardSize">Select Board Size:</label>
                    <select
                        id="boardSize"
                        value={boardSize}
                        onChange={(e) => setBoardSize(Number(e.target.value))}
                    >
                        <option value={4}>4x4</option>
                        <option value={5}>5x5</option>
                        <option value={6}>6x6</option>
                        <option value={8}>8x8</option>
                    </select>
                </div>

                <button className="menu-btn start-btn" onClick={handleStart}>
                    Start Game
                </button>
            </div>
        </div>
    );
};

export default Menu;