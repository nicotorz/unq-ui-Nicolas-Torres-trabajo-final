import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { ConfigContext } from "../../hooks/ConfigContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./menu.css";

const Menu = () => {
    const [boardSize, setBoardSize] = useState(null); 
    const [mode, setMode] = useState(null); 
    const navigate = useNavigate();
    const { setConfig } = useContext(ConfigContext);

    const handleStart = () => {
        if (!mode) {
            toast.error("Please select a game mode!");
            return;
        } else if (!boardSize) {
            toast.error("Please select a board size!");
            return;
        }

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
                        className={`menu-btn ${mode === "1vs1" ? "selected" : ""}`}
                        onClick={() => setMode("1vs1")}
                    >
                        1 vs 1
                    </button>
                </div>

                <div className="option-container">
                    <label htmlFor="boardSize">Select Board Size:</label>
                    <select
                        id="boardSize"
                        value={boardSize || ""} 
                        onChange={(e) => setBoardSize(Number(e.target.value))}
                    >
                        <option value="" disabled>
                            -- Select Board Size --
                        </option>
                        <option value={8}>4x4</option>
                        <option value={18}>6x6</option>
                        <option value={32}>8x8</option>
                    </select>
                </div>

                <button className="menu-btn start-btn" onClick={handleStart}>
                    Start Game
                </button>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Menu;
