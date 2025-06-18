import React from 'react'
import styles from './ProductGrid.module.css'

/**
 * Layout component that makes an grid organization of the products
 * Wait for childrens that will be sorted out automaticaly
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children probably ProductCard
 */

const ProductGrid = ({ children }) => {
    return (
        <div className = {styles.grid}>
            { children }
        </div>
    );
};

export default ProductGrid;