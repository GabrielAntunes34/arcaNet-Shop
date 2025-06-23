import React from 'react';
import { useState, useEffect } from 'react';
import Card from '../../components/Card/Card.jsx';
import './WheelOfFortunePage.css';
import { useFortune } from './fortuneContext.jsx';


const WheelOfFortunePage = () => {
    const {alreadyPlayed, numbers, gameMessage, claimCupon } = useFortune();
    const [flippedCards, setFlippedCards] = useState([false, false, false]);
    const [areCardsFlipped, setAreCardsFlipped] = useState(false);

    // Verifying if we've won a cupon
    useEffect(() => {
        console.log('num',  numbers);

        claimCupon();
    }, [flippedCards, numbers]); // Effect dependencies

    // Changes the message when all the cards have been flipped
    useEffect(() => {
        if (flippedCards.every(Boolean)) {
            setAreCardsFlipped(true);
        } else {
            setAreCardsFlipped(false);
        }
    }, [flippedCards]);

    const handleCardClick = (index) => {
        setFlippedCards(currentFlippedCards => {
            const newFlippedCards = [...currentFlippedCards];
            newFlippedCards[index] = !currentFlippedCards[index];
            return newFlippedCards;
        });
    };

    // Show loading indicator while numbers are being prepared
    if (!numbers) {
        return (
            <div className="wheel-of-fortune-container">
                <h1>Wheel of Fortune</h1>
                <p>Already played today! Better luck next time</p>
            </div>
        );
    }

    return (
        <div className="wheel-of-fortune-container">
            <div className='box-container'>
                <h1> Wheel of Fortune </h1>
                <div className='card-container'>
                    <Card number={numbers[0]} index={0} flipped={flippedCards[0]} func={handleCardClick} />
                    <Card number={numbers[1]} index={1} flipped={flippedCards[1]} func={handleCardClick} />
                    <Card number={numbers[2]} index={2} flipped={flippedCards[2]} func={handleCardClick} />
                </div>
                <div className='result-container'>
                    <h2>The Sun Goddess whispers to you:</h2>
                    <div className='result'>
                    {!alreadyPlayed ? (
                        areCardsFlipped ? (
                            <h3>{gameMessage}</h3>
                        ) : (
                            <h3>Test your luck!</h3>
                        )
                        ) : (
                        <h3>Already played today... Try again tomorrow</h3>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WheelOfFortunePage;
