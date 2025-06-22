import ProductGrid from '../features/products/ProductGrid/ProductGrid.jsx';

const produtos = [
  { id: 1, title: "Camiseta JS", price: 49.9, image: "/assets/js.jpg", stock: 15 },
  { id: 2, title: "Camiseta React", price: 59.9, image: "/assets/react.jpg", stock: 8 },
  { id: 3, title: "Camiseta Vue", price: 39.9, image: "/assets/vue.jpg", stock: 0 },
];

const ProductListPage = () => {
  return (
    <div>
      <h2 style={{ padding: '1rem' }}>Produtos disponíveis</h2>

      <ProductGrid>
        {produtos.map(prod => (
          <ProductCard
            key={prod.id}
            title={prod.title}
            price={prod.price}
            image={prod.image}
            stock={prod.stock}
            onAddToCart={() => alert(`Adicionado: ${prod.title}`)}
          />
        ))}
      </ProductGrid>
    </div>
  );
};

export default ProductListPage;
