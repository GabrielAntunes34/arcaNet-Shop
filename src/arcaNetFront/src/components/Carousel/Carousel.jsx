import React, { useState, useRef } from 'react';
import styles from './Carousel.module.css';

/**
 * Carousel component for horizontal item display with button navigation and mobile swipe support.
 * Displays 3 items per slide.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode[]} props.items - Array of React elements to render in the carousel
 */

const ITEMS_PER_SLIDE = 4; // Definimos que queremos 3 itens por slide/página

const Carousel = ({ items }) => {
  const [current, setCurrent] = useState(0); // 'current' é o índice da PÁGINA atual

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Tratar caso de não haver itens ou não serem suficientes para um slide inicial
  if (!items || items.length === 0) {
    return (
      <div className={styles.carousel}>
        <div className={styles.sliderWindow}>
          {/* Opcional: Adicionar uma mensagem ou placeholder */}
          <div className={styles.slide} style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            Nenhum item para exibir.
          </div>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(items.length / ITEMS_PER_SLIDE);

  /**
   * Navigates to the previous page in the carousel.
   */
  const prevSlide = () => {
    if (totalPages <= 1) return; // Não faz nada se não houver páginas suficientes para navegar
    setCurrent(prev => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  /**
   * Navigates to the next page in the carousel.
   */
  const nextSlide = () => {
    if (totalPages <= 1) return; // Não faz nada se não houver páginas suficientes para navegar
    setCurrent(prev => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  /**
   * Captures the starting X coordinate of the swipe gesture.
   */
  const handleTouchStart = (e) => {
    if (totalPages <= 1) return;
    touchStartX.current = e.touches[0].clientX;
  };

  /**
   * Captures the ending X coordinate while swiping.
   */
  const handleTouchMove = (e) => {
    if (totalPages <= 1) return;
    touchEndX.current = e.touches[0].clientX;
  };

  /**
   * Determines swipe direction and triggers the corresponding navigation.
   */
  const handleTouchEnd = () => {
    if (totalPages <= 1 || !touchStartX.current || !touchEndX.current) {
      touchStartX.current = null;
      touchEndX.current = null;
      return;
    }

    const deltaX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // Distância mínima para considerar um swipe

    if (deltaX > minSwipeDistance) {
      nextSlide(); // Swipe para a esquerda
    } else if (deltaX < -minSwipeDistance) {
      prevSlide(); // Swipe para a direita
    }

    // Reseta os valores de toque
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const canScroll = totalPages > 1;

  return (
    <div
      className={styles.carousel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Botão de navegação: anterior */}
      <button
        onClick={prevSlide}
        className={styles.navButton}
        aria-label="Previous slide"
        disabled={!canScroll} // Desabilita se não houver páginas suficientes
      >
        ‹
      </button>

      {/* Janela de visualização do slider */}
      <div className={styles.sliderWindow}>
        <div
          className={styles.sliderTrack}
          // 'current' é o índice da página. Cada página ocupa 100% da largura da janela.
          // O CSS se encarrega de fazer 3 itens caberem nessa "página".
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className={styles.slide}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Botão de navegação: próximo */}
      <button
        onClick={nextSlide}
        className={styles.navButton}
        aria-label="Next slide"
        disabled={!canScroll} // Desabilita se não houver páginas suficientes
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;