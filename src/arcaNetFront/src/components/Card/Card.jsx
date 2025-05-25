// Card.jsx
import React from 'react';
import verso from '../../assets/backCard.jpg'; // Imagem do verso da carta
import card1Img from '../../assets/carta1.jpg';    // Imagem da frente da carta (exemplo)
import './Card.css';


const frontImageMap = {
    1: card1Img,
    2: card1Img,
    3: card1Img,
    4: card1Img,
    5: card1Img,
    6: card1Img,
    7: card1Img,
    8: card1Img,
    9: card1Img,
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