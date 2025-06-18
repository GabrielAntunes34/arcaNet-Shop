import React, { useState, useEffect } from 'react';
import styles from './SearchBar.module.css';

/**
 * Search bar component with built-in debounce logic.
 * 
 * @param {Object} props - Component props
 * @param {function} props.onSearch - Callback triggered after debounce delay
 * @param {number} [props.delay=500] - Delay in milliseconds before triggering search
 * @param {string} [props.placeholder='Search here...'] - Placeholder text in the input field
 */
const SearchBar = ({ onSearch, delay = 500, placeholder = 'Search here...' }) => {
  const [inputValue, setInputValue] = useState('');

  /**
   * Debounced search logic.
   * Triggers `onSearch` only after the user stops typing for `delay` ms.
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(inputValue);
    }, delay);

    // Clear timeout if the user types again before the delay ends
    return () => clearTimeout(timeout);
  }, [inputValue, delay, onSearch]);

  return (
    <input
      type="text"
      className={styles.searchInput}
      value={inputValue}
      placeholder={placeholder}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};

export default SearchBar;
