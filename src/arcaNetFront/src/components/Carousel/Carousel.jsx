import React, { useState, useRef } from 'react';
import styles from './Carousel.module.css';

/**
 * Carousel component for horizontal item display with button navigation and mobile swipe support.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode[]} props.items - Array of React elements to render in the carousel
 */

const Carousel = ({ items }) => {
  const [current, setCurrent] = useState(0);

  // Refs to store the X coordinates of the touch gesture
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  /**
   * Navigates to the previous item in the carousel.
   */
  const prevSlide = () => {
    setCurrent(prev => (prev === 0 ? items.length - 1 : prev - 1));
  };

  /**
   * Navigates to the next item in the carousel.
   */
  const nextSlide = () => {
    setCurrent(prev => (prev === items.length - 1 ? 0 : prev + 1));
  };

  /**
   * Captures the starting X coordinate of the swipe gesture.
   */
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  /**
   * Captures the ending X coordinate while swiping.
   */
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  /**
   * Determines swipe direction and triggers the corresponding navigation.
   */
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const deltaX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (deltaX > minSwipeDistance) {
      nextSlide(); // Swiped left
    } else if (deltaX < -minSwipeDistance) {
      prevSlide(); // Swiped right
    }

    // Reset touch values
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className={styles.carousel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation button: previous */}
      <button
        onClick={prevSlide}
        className={styles.navButton}
        aria-label="Previous slide"
      >
        ‹
      </button>

      {/* Sliding container */}
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

      {/* Navigation button: next */}
      <button
        onClick={nextSlide}
        className={styles.navButton}
        aria-label="Next slide"
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;
