export const defaultInitialProducts = [
    {
        id: 'p1',
        name: 'The Wild Unknown Tarot',
        photo: 'https://m.media-amazon.com/images/I/61hAp9BEwQL._AC_UF894,1000_QL80_.jpg',
        categories: [{ id: 'c1', name: 'Indie' }, { id: 'c2', name: 'Animals' }],
        stock: 15,
        price: 25.99,
        isHighlighted: true,
        description: "Um popular baralho de tarot indie, conhecido por suas ilustrações de animais e natureza."
    },
    {
        id: 'p2',
        name: 'Rider-Waite Tarot Deck',
        photo: 'https://m.media-amazon.com/images/I/61SnBRdXOwL._AC_UF894,1000_QL80_DpWeblab_.jpg',
        categories: [{ id: 'c3', name: 'Classic' }],
        stock: 30,
        price: 19.99,
        isHighlighted: false,
        description: "O baralho de tarot clássico e mais reconhecido, ideal para iniciantes e estudos aprofundados."
    },
    {
        id: 'p3',
        name: 'Modern Witch Tarot',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGK6fizcsi8MAobPatBKs0Q526mAEpVFTHQA&s',
        categories: [{ id: 'c4', name: 'Modern' }, { id: 'c5', name: 'Diverse' }],
        stock: 22,
        price: 27.50,
        isHighlighted: true,
        description: "Uma releitura moderna e inclusiva do tarot clássico, com ilustrações vibrantes."
    },
    {
        id: 'p4',
        name: 'Tarot of the Divine',
        photo: 'https://down-br.img.susercontent.com/file/ed7ecaa909ea777c9d97cbf48b54f0d4',
        categories: [{ id: 'c6', name: 'Mythology' }, { id: 'c7', name: 'Folklore' }],
        stock: 18,
        price: 29.99,
        isHighlighted: false,
        description: "Inspirado em contos de fadas, divindades e folclore de culturas ao redor do mundo."
    },
    {
        id: 'p5',
        name: 'Light Seer\'s Tarot',
        photo: 'https://a-static.mlcdn.com.br/1500x1500/o-legitimo-taro-waite-78-cartas-plastificado-com-manual-lua-mistica-100-original-loja-oficial/olistplus/opm1k8hk2s3wxmbp/524ebc06cb0669f4d4b07c7a3cc12df5.jpeg',
        categories: [{ id: 'c1', name: 'Indie' }, { id: 'c8', name: 'Spiritual' }],
        stock: 25,
        price: 28.00,
        isHighlighted: true,
        description: "Um baralho que explora as sombras e luzes da alma, com arte expressiva e contemporânea."
    },
    {
        id: 'p6',
        name: 'Golden Art Nouveau Tarot',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT0Q4gIbiU9Vi14csliA_dbrn8JOZcmCcj0Q&s',
        categories: [{ id: 'c9', name: 'Artistic' }, { id: 'c3', name: 'Classic' }],
        stock: 12,
        price: 32.90,
        isHighlighted: false,
        description: "Baseado no estilo Art Nouveau, este baralho possui detalhes dourados e ilustrações elegantes."
    },
    {
        id: 'p7',
        name: 'Everyday Witch Tarot',
        photo: 'https://mandalay.com.br/cdn/shop/products/product-image-1997308149.jpg?v=1683143081&width=1445',
        categories: [{ id: 'c4', name: 'Modern' }, { id: 'c10', name: 'Whimsical' }],
        stock: 20,
        price: 24.99,
        isHighlighted: true,
        description: "Um baralho divertido e acessível, com bruxas modernas em situações cotidianas."
    },
    {
        id: 'p8',
        name: 'Thoth Tarot Deck (Standard)',
        photo: 'https://img.joomcdn.net/2191ea85536fe4bbb9da26a70e4b8390a9a2dd64_original.jpeg',
        categories: [{ id: 'c3', name: 'Classic' }, { id: 'c11', name: 'Esoteric' }],
        stock: 10,
        price: 26.50,
        isHighlighted: false,
        description: "Criado por Aleister Crowley, um baralho rico em simbolismo esotérico e cabalístico."
    },
    {
        id: 'p9',
        name: 'The Fountain Tarot',
        photo: 'https://mandalay.com.br/cdn/shop/files/1_b0819041-3803-451b-8a73-39337a41d692.png?v=1689542682',
        categories: [{ id: 'c1', name: 'Indie' }, { id: 'c9', name: 'Artistic' }, { id: 'c8', name: 'Spiritual' }],
        stock: 17,
        price: 35.00,
        isHighlighted: true,
        description: "Um baralho indie com uma estética minimalista e contemporânea, focado na introspecção."
    },
    {
        id: 'p10',
        name: 'Cat Tarot',
        photo: 'https://ritosloja.com/cdn/shop/files/tarot-cartas-marsella-rider-waite-27_600x.jpg?v=1687534310',
        categories: [{ id: 'c2', name: 'Animals' }, { id: 'c10', name: 'Whimsical' }],
        stock: 28,
        price: 22.95,
        isHighlighted: false,
        description: "Perfeito para amantes de gatos, este baralho traz os arcanos representados por felinos adoráveis."
    }
];

export const defaultInitialCategories = [
    { id: 'c1', name: 'Indie', status: 'Active' },
    { id: 'c2', name: 'Animals', status: 'Active' },
    { id: 'c3', name: 'Classic', status: 'Active' },
    { id: 'c4', name: 'Moon Magic', status: 'Inactive' },
    // Adicione mais categorias
];

export const defaultInitialUsers = [
    {
        id: 'u1',
        name: 'Alice Wonderland',
        email: 'alice@example.com',
        role: 'customer',
        avatar: 'https://via.placeholder.com/40/777/fff?text=AW' // Placeholder com iniciais
    },
    {
        id: 'u2',
        name: 'Bob The Builder',
        email: 'bob@example.com',
        role: 'customer',
        avatar: 'https://via.placeholder.com/40/777/fff?text=BB'
    },
    {
        id: 'u3',
        name: 'Charlie Admin',
        email: 'charlie@admin.com',
        role: 'admin',
        avatar: 'https://via.placeholder.com/40/3498db/fff?text=CA' // Cor diferente para admin
    },
    // Adicione um usuário admin padrão se não existir, conforme seu README
    {
        id: 'adminDefault', // Pode ser um ID fixo
        name: 'Admin Default',
        email: 'admin@admin.com', // E-mail padrão do admin
        role: 'admin',
        avatar: 'https://via.placeholder.com/40/e74c3c/fff?text=AD',
        // Se o seu sistema espera uma senha para o admin,
        // lembre-se que não guardamos senhas em texto plano no frontend/localStorage.
        // A lógica de login verificaria a senha. Para mock, só o role importa aqui.
    }
];