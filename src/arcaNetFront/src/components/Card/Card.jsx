// Card.jsx
import React from 'react';
import verso from '../../assets/backCard.jpg';
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

    const currentFrontImage = frontImageMap[number]; // Mapeia o índice para a imagem da frente

    return (
        // Container principal que lida com a perspectiva para o efeito 3D e o clique
        <div
            className={`card-perspective-container ${flipped ? 'is-flipped' : ''}`}
            onClick={handleClick}
        >

            <div className="card-inner"> {/* Este elemento é o que realmente gira */}


                {/* Carta com o número, depende do que foi passado como prop */}
                <div className="card-face card-face--front">
                    <img src={verso} className='card-image'/>
                </div>

                {/* Verso da carta, comum para todos os número */}
                <div className="card-face card-face--back">
                    <img src={currentFrontImage} className='card-image'/>
                </div>
            </div>
        </div>
    );
}