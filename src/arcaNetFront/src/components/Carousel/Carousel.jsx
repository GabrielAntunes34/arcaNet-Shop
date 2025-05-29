import React, { useState, useRef, useEffect } from 'react';
import styles from './Carousel.module.css';
import Button from '../Button/Button';

const Carousel = ({ items }) => {
  const [current, setCurrent] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const carouselRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    const getItemsPerSlide = () => {
      if (carouselRef.current) {
        const style = getComputedStyle(carouselRef.current);
        const value = style.getPropertyValue('--qtd-carrossel');
        const number = parseInt(value, 10);
        if (!isNaN(number)) setItemsPerSlide(number);
      }
    };

    getItemsPerSlide();

    window.addEventListener('resize', getItemsPerSlide);
    return () => window.removeEventListener('resize', getItemsPerSlide);
  }, []);

  if (!items || items.length === 0) {
    return (
      <div className={styles.carousel}>
        <div className={styles.sliderWindow}>
          <div className={styles.slide} style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            Nenhum item para exibir.
          </div>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(items.length / itemsPerSlide);

  const prevSlide = () => {
    if (totalPages <= 1) return;
    setCurrent(prev => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const nextSlide = () => {
    if (totalPages <= 1) return;
    setCurrent(prev => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    if (totalPages <= 1) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (totalPages <= 1) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (totalPages <= 1 || !touchStartX.current || !touchEndX.current) {
      touchStartX.current = null;
      touchEndX.current = null;
      return;
    }

    const deltaX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (deltaX > minSwipeDistance) {
      nextSlide();
    } else if (deltaX < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const canScroll = totalPages > 1;

  return (
    <div
      ref={carouselRef}
      className={styles.carousel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Button
        onClick={prevSlide}
        className={styles.navButton}
        aria-label="Previous slide"
        disabled={!canScroll}
      >
        ‹
      </Button>

      <div className={styles.sliderWindow}>
        <div
          className={styles.sliderTrack}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className={styles.slide}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={nextSlide}
        className={styles.navButton}
        aria-label="Next slide"
        disabled={!canScroll}
      >
        ›
      </Button>
    </div>
  );
};

export default Carousel;
