// src/features/admin/products/ProductTabCard.jsx
import React from 'react';
import Button from '../../../components/Button/Button'; // Ajuste o caminho
import styles from './ProductTabCard.module.css';

const ProductTabCard = ({
    product,
    allSystemCategories,
    onDelete,
    onToggleHighlight,
    onRemoveCategoryFromProduct,
    onAddCategoryToProduct, // Para o botão "Add Category" específico do produto
    onAddSupply, // Para o botão "Add supply"
}) => {
    const { id, name, photo, categories = [], stock = 0, isHighlighted = false } = product;

    const handleHighlightChange = (e) => {
        onToggleHighlight(id, e.target.checked);
    };

    return (
        <div className={styles.productTabCard}>
            <img src={photo || 'https://via.placeholder.com/100x100.png?text=No+Image'} alt={name} className={styles.productImage} />
            <div className={styles.productInfo}>
                <h3 className={styles.productName}>{name || 'Unnamed Product'}</h3>
                <div className={styles.categories}>
                    <span>Categories: </span>
                    {categories.length > 0 ? product.categories.map(prodCatStub => {
                        // Encontra a info completa da categoria na lista 'allSystemCategories'
                        // prodCatStub pode ser apenas um ID ou um objeto {id, name} mais antigo
                        const categoryId = typeof prodCatStub === 'object' ? prodCatStub.id : prodCatStub;
                        const currentCategoryInfo = allSystemCategories.find(sysCat => sysCat.id === categoryId);

                        if (currentCategoryInfo) { // Só exibe se a categoria ainda existir no sistema
                            return (
                                <span key={currentCategoryInfo.id} className={`${styles.categoryTag} ${currentCategoryInfo.status !== 'Active' ? styles.inactiveCategoryTag : ''}`}>
                                    {currentCategoryInfo.name} 
                                    {currentCategoryInfo.status !== 'Active' && " (Inactive)"} {/* Opcional: indicar se inativa */}
                                    <button
                                        onClick={() => onRemoveCategoryFromProduct(id, currentCategoryInfo.id)}
                                        className={styles.removeCatButton}
                                        title="Remove category"
                                    >
                                        &times;
                                    </button>
                                </span>
                            );
                        }
                        return null; // Ou alguma indicação de categoria "desconhecida"
                    }) : <span className={styles.noCategory}>None</span>}
                </div>
                <p className={styles.stock}>Remaining: {stock}</p>
            </div>
            <div className={styles.productActions}>
                <label className={styles.highlightLabel}>
                    <input
                        type="checkbox"
                        checked={isHighlighted}
                        onChange={handleHighlightChange}
                    />
                    Highlight
                </label>
                <Button onClick={() => onAddCategoryToProduct(id)} size="small" variant="secondary">Add Category</Button>
                <Button onClick={() => onAddSupply(id)} size="small" variant="secondary">Add Supply</Button>
                <Button onClick={() => onDelete(id)} variant="danger" size="small">Delete Item</Button>
            </div>
        </div>
    );
};

export default ProductTabCard;