import ProductCard from '../features/products/ProductCard/ProductCard.jsx';

const Playground = () => {
  const produto = {
    name: "Camiseta React",
    description: "100% algodão, disponível nos tamanhos P/M/G",
    image: "/assets/camiseta.jpg",
    price: 59.9,
    stock: 10
  };

  return (
    <div style={{ padding: '2rem' }}>
      <ProductCard
        {...produto}
        stock={produto.stock}
        onAddToCart={() => alert('Produto adicionado!')}
      />
    </div>
  );
};

export default Playground;
