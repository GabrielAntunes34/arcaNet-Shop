db = db.getSiblingDB('arcanet');

db.createCollection("categories");
//db.createCollection("cupons");
db.createCollection("products");
db.createCollection("users");

// Insere os dados nas coleções
db.categories.insertMany([
  {
    "name": "Arcanos Maiores",
    "status": "Active"
  },
  {
    "name": "Arcanos Menores",
    "status": "Active"
  },
  {
    "name": "Cartas de Amor",
    "status": "Active"
  },
  {
    "name": "Cartas de Carreira",
    "status": "Active"
  },
  {
    "name": "Cartas de Saúde",
    "status": "Active"
  },
  {
    "name": "Baralhos Clássicos",
    "status": "Active"
  },
  {
    "name": "Baralhos Modernos",
    "status": "Active"
  },
  {
    "name": "Oráculos",
    "status": "Active"
  },
  {
    "name": "Cartas para Meditação",
    "status": "Active"
  },
  {
    "name": "Cartas de Autoconhecimento",
    "status": "Active"
  },
  {
    "name": "Cartas Raras",
    "status": "Inactive"
  },
  {
    "name": "Cartas Promocionais",
    "status": "Active"
  }
]);

db.products.insertMany([
  {
    "name": "Tarô de Marselha Clássico",
    "description": "Uma das versões mais antigas do tarô, com ilustrações tradicionais do século XVII.",
    "image": "https://m.media-amazon.com/images/I/61hAp9BEwQL._AC_UF894,1000_QL80_.jpg",
    "price": 89.90,
    "stock": 30,
    "sold": 5,
    "highlighted": true,
    "categories": []
  },
  {
    "name": "Tarô dos Anjos",
    "description": "Cartas voltadas à conexão espiritual com seres angelicais e mensagens de luz.",
    "image": "https://m.media-amazon.com/images/I/61SnBRdXOwL._AC_UF894,1000_QL80_DpWeblab_.jpg",
    "price": 109.50,
    "stock": 25,
    "sold": 7,
    "highlighted": false,
    "categories": []
  },
  {
    "name": "Tarô Egípcio",
    "description": "Com símbolos místicos do Antigo Egito, ideal para consultas profundas e espirituais.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGK6fizcsi8MAobPatBKs0Q526mAEpVFTHQA&s",
    "price": 129.99,
    "stock": 15,
    "sold": 12,
    "highlighted": true,
    "categories": []
  },
  {
    "name": "Tarô dos Animais de Poder",
    "description": "Cartas ilustradas com arquétipos animais para orientar decisões e fortalecer energias.",
    "image": "https://down-br.img.susercontent.com/file/ed7ecaa909ea777c9d97cbf48b54f0d4",
    "price": 95.00,
    "stock": 20,
    "sold": 4,
    "highlighted": false,
    "categories": []
  },
  {
    "name": "Tarô do Amor",
    "description": "Focado em questões afetivas e relacionamentos, ideal para leituras amorosas.",
    "image": "/images/tarot-love.jpg",
    "price": 79.90,
    "stock": 40,
    "sold": 10,
    "highlighted": true,
    "categories": []
  },
  {
    "name": "Baralho Cigano Lenormand",
    "description": "Tradicional baralho cigano com 36 cartas para consultas diretas e objetivas.",
    "image": "https://a-static.mlcdn.com.br/1500x1500/o-legitimo-taro-waite-78-cartas-plastificado-com-manual-lua-mistica-100-original-loja-oficial/olistplus/opm1k8hk2s3wxmbp/524ebc06cb0669f4d4b07c7a3cc12df5.jpeg",
    "price": 69.90,
    "stock": 35,
    "sold": 18,
    "highlighted": false,
    "categories": []
  },
  {
    "name": "Tarô das Bruxas Modernas",
    "description": "Visual moderno e empoderado para praticantes contemporâneas da espiritualidade.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT0Q4gIbiU9Vi14csliA_dbrn8JOZcmCcj0Q&s",
    "price": 119.00,
    "stock": 22,
    "sold": 6,
    "highlighted": true,
    "categories": []
  },
  {
    "name": "Oráculo da Deusa",
    "description": "Cartas inspiradas em arquétipos femininos de diversas culturas antigas.",
    "image": "https://mandalay.com.br/cdn/shop/products/product-image-1997308149.jpg?v=1683143081&width=1445",
    "price": 102.00,
    "stock": 18,
    "sold": 3,
    "highlighted": false,
    "categories": []
  },
  {
    "name": "Cartas para Meditação Diária",
    "description": "52 cartas com frases e imagens para reflexão pessoal e mindfulness.",
    "image": "https://img.joomcdn.net/2191ea85536fe4bbb9da26a70e4b8390a9a2dd64_original.jpeg",
    "price": 59.90,
    "stock": 50,
    "sold": 20,
    "highlighted": false,
    "categories": []
  },
  {
    "name": "Tarô das Sombras",
    "description": "Voltado ao autoconhecimento e trabalho com aspectos ocultos da psique.",
    "image": "https://mandalay.com.br/cdn/shop/files/1_b0819041-3803-451b-8a73-39337a41d692.png?v=1689542682",
    "price": 110.00,
    "stock": 12,
    "sold": 2,
    "highlighted": true,
    "categories": []
  }
]);


// Client password: "Admin12#"
// Admin password: "Admin12#"
db.users.insertMany([
  {
    "name": "Example Client",
    "email": "client@example.com",
    "address": "Travessa do Mago, 12 - Brasília, DF",
    "phone": "(61) 91111-2222",
    "role": "client",
    "password": "$2b$10$CHMjaz2gA0kGZK6LLl3MreiN8Qc6D0EBImit9OXVHBwH//TcX5FQ6"
  },
  {
    "name": "Example Admin",
    "email": "admin@example.com",
    "address": "Av Joaquim Spereta 281",
    "phone": "16996278250",
    "role": "admin",
    "password": "$2b$10$CHMjaz2gA0kGZK6LLl3MreiN8Qc6D0EBImit9OXVHBwH//TcX5FQ6"
  }
]);
