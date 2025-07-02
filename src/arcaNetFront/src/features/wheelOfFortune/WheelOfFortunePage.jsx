import React from 'react';
import { useState, useEffect } from 'react';
import Card from '../../components/Card/Card.jsx';
import './WheelOfFortunePage.css';
import { useFortune } from './fortuneContext.jsx';
import { useLayoutEffect } from 'react';


const WheelOfFortunePage = () => {
    const {numbers, gameMessage, drawCupon, claimCupon } = useFortune();
    const [flippedCards, setFlippedCards] = useState([false, false, false]);
    const [areCardsFlipped, setAreCardsFlipped] = useState(false);

    // Drawing cards if it's our first time playing
    useLayoutEffect(() => {
        drawCupon();
    }, []);
    
    // Verifying if we've won a cupon
    useEffect(() => {
        if(areCardsFlipped)
            claimCupon();
    }, [areCardsFlipped]); // Effect dependencies

    // Changes the message when all the cards have been flipped
    useEffect(() => {
        if (flippedCards.every(Boolean))
            setAreCardsFlipped(true);
        else
            setAreCardsFlipped(false);
    }, [flippedCards]);

    const handleCardClick = (index) => {
        setFlippedCards(currentFlippedCards => {
            const newFlippedCards = [...currentFlippedCards];
            newFlippedCards[index] = !currentFlippedCards[index];
            return newFlippedCards;
        });
    };

    return (
        <div className="wheel-of-fortune-container">
            <div className='box-container'>
                <h1> Wheel of Fortune </h1>

                {numbers ? (
                    <div className='card-container'>
                        <Card number={numbers[0]} index={0} flipped={flippedCards[0]} func={handleCardClick} />
                        <Card number={numbers[1]} index={1} flipped={flippedCards[1]} func={handleCardClick} />
                        <Card number={numbers[2]} index={2} flipped={flippedCards[2]} func={handleCardClick} />
                    </div>
                ) : (
                    <></>
                )}

                <div className='result-container'>
                    <h2>The Sun Goddess whispers to you:</h2>
                    <div className='result'>
                    {areCardsFlipped ? (
                        <h3>{gameMessage}</h3>
                    ) : (
                        <h3>Test your luck!</h3>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WheelOfFortunePage;
