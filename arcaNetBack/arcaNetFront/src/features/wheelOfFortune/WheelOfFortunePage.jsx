import React from 'react';
import { useState, useEffect } from 'react';
import Card from '../../components/Card/Card.jsx';
import './WheelOfFortunePage.css';


const LOCAL_STORAGE_KEY = 'wheelOfFortuneDailyNumbers';

// Função para gerar números aleatórios
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

        // Deixa a data no formato string YYYY-MM-DD (para comparação fácil)
        const todayDateString = today.toISOString().split('T')[0];
        console.log('Data de hoje:', todayDateString);

        let dailyNumbers;
        if (storedDataString) {
            try {
                const storedData = JSON.parse(storedDataString);

                // Verifica se os dados são do dia atual e se o array de valores é válido
                if (storedData.date === todayDateString && Array.isArray(storedData.values) && storedData.values.length === 3) {
                    dailyNumbers = storedData.values;
                    console.log('Números carregados do localStorage para hoje:', dailyNumbers);
                }
            } catch (error) {
                console.error("Erro ao parsear dados do localStorage:", error);
            }
        }

        // Se não há números para hoje no localStorage (ou os dados são inválidos/antigos)
        if (!dailyNumbers) {
            dailyNumbers = generateRandomNumbers();
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
                date: todayDateString,
                values: dailyNumbers
            }));
            console.log('Novos números gerados e salvos para hoje:', dailyNumbers);
        }

        setNumbers(dailyNumbers);
    }, []); // O array de dependências vazio [] garante que este efeito rode apenas uma vez, quando o componente é montado.


    useEffect(() => {
        // Só executa a lógica se os números já foram carregados/gerados e são um array de 3 posições
        if (!numbers || numbers.length !== 3) {
            setGameMessage(''); // Limpa a mensagem se os números não estiverem prontos
            return;
        }

        // Verifica se todas as 3 cartas estão viradas
        const allCardsAreFlipped = flippedCards.every(isFlipped => isFlipped === true);

        if (allCardsAreFlipped) {
            // Se todas estão viradas, verifica se os números são iguais
            const allNumbersAreEqual = numbers[0] === numbers[1] && numbers[1] === numbers[2];

            if (allNumbersAreEqual) {
                // A se inserir o cupom gerado aqui
                setGameMessage("Congratulations!");
            } else {
                setGameMessage("Better luck next time!");
            }
        } else {
            // Se nem todas as cartas estão viradas, limpa a mensagem anterior
            setGameMessage('');
        }
    }, [flippedCards, numbers]); // Dependências do efeito

    const handleCardClick = (index) => {
        setFlippedCards(currentFlippedCards => {
            const newFlippedCards = [...currentFlippedCards];
            newFlippedCards[index] = !currentFlippedCards[index];
            return newFlippedCards;
        });
    };

    // Renderiza um indicador de carregamento enquanto os números não são definidos
    if (!numbers) {
        return (
            <div className="wheel-of-fortune-container">
                <h1>Wheel of Fortune</h1>
                <p>Carregando cartas...</p>
            </div>
        );
    }


    return (
        <div className="wheel-of-fortune-container">
            <div className='box-container'>
                <h1> Wheel of Fortune </h1>
                <div className='card-container'>
                    <Card number={numbers[0]} index={0} flipped={flippedCards[0]} func={handleCardClick}> </Card>
                    <Card number={numbers[1]} index={1} flipped={flippedCards[1]} func={handleCardClick}> </Card>
                    <Card number={numbers[2]} index={2} flipped={flippedCards[2]} func={handleCardClick}> </Card>
                </div>
                <div className='result-container'>
                    <h2>The Sun Goddness whispers to you:</h2>
                    <div className='result'>
                        <h3> {gameMessage} </h3>
                    </div>

                </div>
            </div>
            

        </div>
    )
}

export default WheelOfFortunePage;