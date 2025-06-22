import Carousel from '../components/Carousel/Carousel';

const PlaygroundCarousel = () => {
  // Simulating products with images
  const imagens = [
    <img src="/assets/camiseta.jpg" alt="Camiseta" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />,
    <img src="/assets/tenis.jpg" alt="Tênis" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />,
    <img src="/assets/mochila.jpg" alt="Mochila" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />,
  ];

  return (
    <div style={{ maxWidth: '600px', margin: '3rem auto' }}>
      <h2 style={{ textAlign: 'center' }}>Exemplo de Carousel</h2>
      <Carousel items={imagens} />
    </div>
  );
};

export default PlaygroundCarousel;

/*
| Parte                | Conceito aplicado                          |
| -------------------- | ------------------------------------------ |
| `Carousel`           | Componente reutilizável com props          |
| `items = [...]`      | Props dinâmicas com JSX                    |
| `style={{ ... }}`    | Estilização inline para teste rápido       |
| `maxWidth + auto`    | Centraliza o carrossel na página           |
| `objectFit: 'cover'` | Garante que a imagem preencha corretamente |

Como testar:

Se quiser acessar isso pelo navegador, só adicione essa rota temporária no seu AppRoutes.jsx:

import PlaygroundCarousel from '../pages/PlaygroundCarousel';

// dentro de <Route path="/" element={<Layout />}>
<Route path="carousel-test" element={<PlaygroundCarousel />} />

Depois, acesse:

http://localhost:3000/carousel-test

*/