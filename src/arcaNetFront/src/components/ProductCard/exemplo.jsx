import ProductCard from '../components/ProductCard/ProductCard';

const Playground = () => {
  const produto = {
    name: "Camiseta React",
    description: "100% algodão, disponível nos tamanhos P/M/G",
    image: "/assets/camiseta.jpg",
    price: 59.9
  };

  return (
    <div style={{ padding: '2rem' }}>
      <ProductCard
        {...produto}
        onAddToCart={() => alert('Produto adicionado!')}
      />
    </div>
  );
};

export default Playground;
