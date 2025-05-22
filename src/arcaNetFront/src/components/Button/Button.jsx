import React from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

/**
 * Generic button component with visual variants and optional attributes.
 *
 * @param {Object} props - Component props
 * @param {'primary'|'secondary'|'danger'|'outline'} [props.variant='primary'] - Visual style of the button
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {function} props.onClick - Function to call when button is clicked
 * @param {React.ReactNode} props.children - Button label or content
 * @param {string} [props.type='button'] - Button type (button, submit, reset)
 * @param {Object} [rest] - Any other HTML button attributes 
 */
const Button = ({
  variant = 'primary',
  disabled = false,
  onClick,
  children,
  type = 'button',
  ...rest
}) => {
  return (
    <button
      type={type}
      className={clsx(styles.button, styles[variant])} // Combine base and variant styles
      onClick={onClick}
      disabled={disabled}
      {...rest} // Allows additional attributes (e.g. id, aria-label)
    >
      {children}
    </button>
  );
};

export default Button;
