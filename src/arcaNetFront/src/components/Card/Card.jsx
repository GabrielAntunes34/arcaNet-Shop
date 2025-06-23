// Card.jsx
import React from 'react';
import verso from '../../assets/backCard.jpg';
import card0Img from '../../assets/carta0.png'
import card1Img from '../../assets/carta1.jpg';  
import card2Img from '../../assets/carta2.jpg';
import card3Img from '../../assets/carta3.jpg';  
import card4Img from '../../assets/carta4.jpg';
import card5Img from '../../assets/carta5.jpg';  
import card6Img from '../../assets/carta6.jpg';
import card7Img from '../../assets/carta7.jpg';  
import card8Img from '../../assets/carta8.jpg';
import card9Img from '../../assets/carta9.jpg';

import './Card.css';

const frontImageMap = {
    0: card0Img,
    1: card1Img,
    2: card2Img,
    3: card3Img,
    4: card4Img,
    5: card5Img,
    6: card6Img,
    7: card7Img,
    8: card8Img,
    9: card9Img,
};

export default function Card({ number, index, flipped, func }) {
    const handleClick = () => {
        if (func) {
            func(index);
        }
    };

    const currentFrontImage = frontImageMap[number]; // Maps the index to the correct front image

    return (
        // Main container that manages perspective for the 3D flip effect and handles click
        <div
            className={`card-perspective-container ${flipped ? 'is-flipped' : ''}`}
            onClick={handleClick}
        >

            <div className="card-inner"> {/* The element that actually flips */}


                {/* Front of the card, shows the back image by default */}
                <div className="card-face card-face--front">
                    <img src={verso} className='card-image' />
                </div>

                {/* Back of the card, specific image based on number */}
                <div className="card-face card-face--back">
                    <img src={currentFrontImage} className='card-image' />
                </div>
            </div>
        </div>
    );
}
