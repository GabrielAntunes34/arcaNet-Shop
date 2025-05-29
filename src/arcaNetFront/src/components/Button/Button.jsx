import React, { useState } from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

const Button = ({
  variant = 'primary',
  disabled = false,
  onClick,
  children,
  type = 'button',
  className,
  ...rest
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = (e) => {
    if (disabled) return;

    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150); // Reset after animation

    onClick?.(e); // Call the user's onClick
  };

  return (
    <button
      type={type}
      className={clsx(styles.button, styles[variant], className, isPressed && styles.pressed)}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
