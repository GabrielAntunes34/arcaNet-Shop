export const defaultInitialProducts = [
    {
        id: 'p1',
        name: 'The Wild Unknown Tarot',
        photo: 'https://via.placeholder.com/150/A2D2A2/000000?Text=Wild+Unknown',
        categories: [{ id: 'c1', name: 'Indie' }, { id: 'c2', name: 'Animals' }], // Use IDs de categorias
        stock: 15,
        price: 25.99,
        isHighlighted: true,
        description: "A popular indie tarot deck."
    },
    {
        id: 'p2',
        name: 'Rider-Waite Tarot Deck',
        photo: 'https://via.placeholder.com/150/E9E1D0/000000?Text=Rider+Waite',
        categories: [{ id: 'c3', name: 'Classic' }],
        stock: 30,
        price: 19.99,
        isHighlighted: false,
        description: "The classic tarot deck."
    },
    // Adicione mais produtos aqui para ter uma base inicial consistente
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