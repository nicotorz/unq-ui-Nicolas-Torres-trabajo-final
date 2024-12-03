import BoardIcons from "./boardIcons";
import "./board.css";
import { useState } from "react";

const Board = () => {
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]); 

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
            const [firstCard, secondCard] = newFlippedCards;

            if (firstCard.image === secondCard.image) {
                setMatchedCards([...matchedCards, firstCard.image]);
            }

            setTimeout(() => setFlippedCards([]), 1000);
        }
    };

    return (
        <ul className="board-content">
            <div className="board-grid">
                {BoardIcons.map((image, index) => {
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
    );
};

export default Board;
