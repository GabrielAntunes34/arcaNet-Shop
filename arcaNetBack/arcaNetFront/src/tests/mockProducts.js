// This file just implements an array of products to test the cards in ProductDetails
// And product list pages, while we don't have access to the back-end
// Category should be a foreing key, but we put the name here, just to simplfy

const mockProducts = [
  {
    id: 1,
    photo: "https://via.placeholder.com/150?text=Produto+1",
    Description: "Óculos de sol estilo aviador com proteção UV400.",
    price: 199.9,
    stock: 15,
    sold: 7,
    Highlighted: true,
    category: 1,
  },
  {
    id: 2,
    photo: "https://via.placeholder.com/150?text=Produto+2",
    Description: "Tênis esportivo confortável para corrida e caminhada.",
    price: 299.5,
    stock: 30,
    sold: 18,
    Highlighted: false,
    category: 2,
  },
  {
    id: 3,
    photo: "https://via.placeholder.com/150?text=Produto+3",
    Description: "Smartphone com tela de 6.5 polegadas e câmera tripla.",
    price: 1499.99,
    stock: 8,
    sold: 5,
    Highlighted: true,
    category: 3,
  },
  {
    id: 4,
    photo: "https://via.placeholder.com/150?text=Produto+4",
    Description: "Camiseta básica 100% algodão, diversas cores disponíveis.",
    price: 59.9,
    stock: 50,
    sold: 22,
    Highlighted: false,
    category: 1,
  },
  {
    id: 5,
    photo: "https://via.placeholder.com/150?text=Produto+5",
    Description: "Fone de ouvido Bluetooth com cancelamento de ruído.",
    price: 349.9,
    stock: 20,
    sold: 14,
    Highlighted: true,
    category: 3,
  },
  {
    id: 6,
    photo: "https://via.placeholder.com/150?text=Produto+6",
    Description: "Mochila resistente para laptop com vários compartimentos.",
    price: 249.0,
    stock: 12,
    sold: 9,
    Highlighted: false,
    category: 2,
  },
  {
    id: 7,
    photo: "https://via.placeholder.com/150?text=Produto+7",
    Description: "Relógio digital esportivo com cronômetro e monitor cardíaco.",
    price: 179.99,
    stock: 18,
    sold: 10,
    Highlighted: true,
    category: 2,
  },
  {
    id: 8,
    photo: "https://via.placeholder.com/150?text=Produto+8",
    Description: "Caneca personalizada com design exclusivo para amantes de café.",
    price: 39.9,
    stock: 60,
    sold: 35,
    Highlighted: false,
    category: 1,
  },
  {
    id: 9,
    photo: "https://via.placeholder.com/150?text=Produto+9",
    Description: "Livro de ficção científica best-seller com ótimas críticas.",
    price: 49.9,
    stock: 25,
    sold: 13,
    Highlighted: false,
    category: 3,
  },
  {
    id: 10,
    photo: "https://via.placeholder.com/150?text=Produto+10",
    Description: "Tablet com 10 polegadas, ideal para leitura e trabalho.",
    price: 899.9,
    stock: 10,
    sold: 7,
    Highlighted: true,
    category: 3,
  }
];

export default mockProducts;


const categories = [
    {
        id: 1,
        name: 'A',
    },
    {
        id: 2,
        name: 'B',
    },
    {
        id: 3,
        name: 'C',
    },
];


export {mockProducts, categories};