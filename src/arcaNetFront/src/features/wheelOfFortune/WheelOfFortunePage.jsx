import React from 'react';
import { useState } from 'react';
import Card from '../../components/Card/Card.jsx';
import './WheelOfFortunePage.css';


const WheelOfFortunePage = () => {
    const [flippedCards, setFlippedCards] = useState([false, false, false]);
    const [numbers, setNumbers] = useState([1, 2, 3]); 

    const handleCardClick = (index) => {
        const newFlippedCards = [...flippedCards];
        newFlippedCards[index] = !flippedCards[index];
        setFlippedCards(newFlippedCards);
    }

    return (
        <div className="wheel-of-fortune-container">
            <h1> Wheel of Fortune </h1>
            <div className='card-container'>
                <Card number={1} index={0} flipped={flippedCards[0]} func={handleCardClick}> </Card>
                <Card number={1} index={1} flipped={flippedCards[1]} func={handleCardClick}> </Card>
                <Card number={1} index={2} flipped={flippedCards[2]} func={handleCardClick}> </Card>
            </div>

        </div>
    )
}

export default WheelOfFortunePage;