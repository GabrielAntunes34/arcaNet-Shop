import React, { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom';

const allProducts = [
    { id: 1, name: "Death Tarot", price: 35.0, category: "death", photo: "https://via.placeholder.com/400x600.png?text=Death+Tarot", description: "Embark on a journey through the veiled realms of reality and perception with the Nocturne of Truth and Illusions tarot deck. This collection of 78 intricately designed cards serves as a mirror to the soul, reflecting both the clarity of truth and the allure of illusion. Each card invites introspection, guiding you through the shadows and light of your inner world." },
    { id: 2, name: "Moon Tarot", price: 40.0, category: "moon", photo: "https://via.placeholder.com/400x600.png?text=Moon+Tarot", description: "Discover the mysteries of the night with the Moon Tarot. These cards delve into the subconscious, dreams, and the hidden aspects of life, offering guidance through intuition and a deeper understanding of the unseen." },
    { id: 3, name: "Fullmoon Tarot", price: 50.0, category: "fullmoon", photo: "https://via.placeholder.com/400x600.png?text=Fullmoon+Tarot", description: "The Fullmoon Tarot illuminates your path with the bright energy of the full moon. It's a deck focused on clarity, culmination, and the revelation of truths, perfect for when you seek to bring light to uncertainty." },
    // Adicione mais produtos conforme necessário para teste
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = allProducts.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  const handleAddToCart = () => {
    alert(`${quantity} x "${product.name}" added to cart!`);
    // Aqui você deve chamar o contexto/cart ou serviço para adicionar ao carrinho
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', display: 'flex', gap: '40px' }}>
      <div style={{ flex: 1 }}>
        <img src={product.photo} alt={product.name} style={{ width: '100%', objectFit: 'contain' }} />
      </div>
      <div style={{ flex: 1 }}>
        <h2>{product.name}</h2>
        <p style={{ fontWeight: 'bold', fontSize: '24px' }}>${product.price.toFixed(2)}</p>
        <span style={{ padding: '4px 10px', backgroundColor: '#333', color: 'white', borderRadius: '12px', fontSize: '12px' }}>
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </span>
        <p style={{ marginTop: '20px' }}>{product.description}</p>

        <label htmlFor="quantity" style={{ display: 'block', marginTop: '20px', marginBottom: '8px' }}>
          Quantity
        </label>
        <select
          id="quantity"
          value={quantity}
          onChange={e => setQuantity(parseInt(e.target.value))}
          style={{ padding: '8px', fontSize: '16px', width: '100px' }}
        >
          {[1, 2, 3, 4, 5].map(q => (
            <option key={q} value={q}>{q}</option>
          ))}
        </select>

        <button
          onClick={handleAddToCart}
          style={{
            marginTop: '20px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            padding: '12px 20px',
            width: '100%',
            cursor: 'pointer',
            borderRadius: '6px',
            fontSize: '16px',
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
