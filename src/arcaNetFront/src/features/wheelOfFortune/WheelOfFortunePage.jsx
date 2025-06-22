import React from 'react';
import { useState, useEffect } from 'react';
import Card from '../../components/Card/Card.jsx';
import './WheelOfFortunePage.css';

const LOCAL_STORAGE_KEY = 'wheelOfFortuneDailyNumbers';

// Function to generate random numbers
const generateRandomNumbers = () => {
    return Array.from(
        { length: 3 },
        () => Math.floor(Math.random() * 9) + 1
    );
};

const WheelOfFortunePage = () => {
    const [flippedCards, setFlippedCards] = useState([false, false, false]);
    const [numbers, setNumbers] = useState(null);
    const [gameMessage, setGameMessage] = useState('');

    useEffect(() => {
        const storedDataString = localStorage.getItem(LOCAL_STORAGE_KEY);
        const today = new Date();

        // Format the date as YYYY-MM-DD (for easy comparison)
        const todayDateString = today.toISOString().split('T')[0];
        console.log('Today date:', todayDateString);

        let dailyNumbers;
        if (storedDataString) {
            try {
                const storedData = JSON.parse(storedDataString);

                // Check if the data is from today and if the values array is valid
                if (storedData.date === todayDateString && Array.isArray(storedData.values) && storedData.values.length === 3) {
                    dailyNumbers = storedData.values;
                    console.log('Numbers loaded from localStorage for today:', dailyNumbers);
                }
            } catch (error) {
                console.error("Error parsing data from localStorage:", error);
            }
        }

        // If there is no valid data for today
        if (!dailyNumbers) {
            dailyNumbers = generateRandomNumbers();
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
                date: todayDateString,
                values: dailyNumbers
            }));
            console.log('New numbers generated and saved for today:', dailyNumbers);
        }

        setNumbers(dailyNumbers);
    }, []); // This effect runs only once when the component mounts

    useEffect(() => {
        // Only proceed if numbers are loaded and valid
        if (!numbers || numbers.length !== 3) {
            setGameMessage('');
            return;
        }

        // Check if all cards are flipped
        const allCardsAreFlipped = flippedCards.every(isFlipped => isFlipped === true);

        if (allCardsAreFlipped) {
            // Check if all numbers are equal
            const allNumbersAreEqual = numbers[0] === numbers[1] && numbers[1] === numbers[2];

            if (allNumbersAreEqual) {
                // Insert reward logic here if needed
                setGameMessage("Congratulations!");
            } else {
                setGameMessage("Better luck next time!");
            }
        } else {
            // Reset message if not all cards are flipped
            setGameMessage('');
        }
    }, [flippedCards, numbers]); // Effect dependencies

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
                <p>Loading cards...</p>
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
                        <h3>{gameMessage}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WheelOfFortunePage;
