import "./card.css";

const Card = ({ image, uniqueKey, handleCardClick, flippedCards, matchedCards, currentPlayer }) => {
    const isFlipped =
        flippedCards.some((card) => card.uniqueKey === uniqueKey) ||
        matchedCards.includes(image);

    return (
        <li
            className={`board-item ${isFlipped ? "flipped" : ""}`}
            onClick={() => handleCardClick(image, uniqueKey)}
        >
            <div className="card">
                <div className={`card-back ${currentPlayer === 1 ? "blue" : "red"}`}>?</div>
                <div className="card-front">
                    <img alt="icon" src={image} />
                </div>
            </div>
        </li>
    );
};

export default Card;
