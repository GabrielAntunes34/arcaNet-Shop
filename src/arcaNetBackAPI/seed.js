require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');         
const Category = require('./models/Category'); 
const Product = require('./models/Product');   

async function main() {
  // 1) Connect & drop the database
  await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB, dropping database...');
  await mongoose.connection.dropDatabase();

  // 2) Create categories
  const categoryNames = [
    'Major Arcana',
    'Minor Arcana',
    'Cups',
    'Wands',
    'Swords',
    'Pentacles',
    'Love',
    'Spiritual'
  ];
  const categories = await Category.insertMany(
    categoryNames.map(name => ({ name, status: 'Active' }))
  );
  console.log(`Created ${categories.length} categories.`);

  // 3) Helper to hash passwords
  const saltRounds = parseInt(process.env.PASS_SALT || '10', 10);
  const hash = txt => bcrypt.hash(txt, saltRounds);

  // 4) Create users
  const admin = {
    name: 'Admin User',
    email: 'admin@arcanet.local',
    role: 'admin',
    password: await hash('@Admin,1234')
  };
  const client = {
    name: 'Robson Client',
    email: 'client@arcanet.local',
    role: 'client',
    password: await hash('@Client,1234')
  };
  await User.create([admin, client]);
  console.log('Created admin and client users.');

  // 5) Build a map of category name → _id
  const catMap = categories.reduce((m, c) => {
    m[c.name] = c._id;
    return m;
  }, {});

  // 6) Create 8 Tarot-card products
  const productsData = [
    { name: 'The Fool',            categories: ['Major Arcana'] },
    { name: 'The Magician',        categories: ['Major Arcana'] },
    { name: 'The High Priestess',  categories: ['Major Arcana', 'Spiritual'] },
    { name: 'Ace of Cups',         categories: ['Cups', 'Minor Arcana'] },
    { name: 'Ace of Wands',        categories: ['Wands', 'Minor Arcana'] },
    { name: 'Two of Swords',       categories: ['Swords', 'Minor Arcana'] },
    { name: 'Three of Pentacles',  categories: ['Pentacles', 'Minor Arcana'] },
    { name: 'The Lovers',          categories: ['Major Arcana', 'Love'] }
  ];

  const products = await Product.insertMany(productsData.map(p => ({
    name:        p.name,
    description: `Tarot card: ${p.name}`,
    image:       "name",             // as requested, use the card name string
    price:       Math.floor(Math.random() * 50) + 10, // random between $10–59
    stock:       100,
    sold:        0,
    highlighted: false,
    categories:  p.categories.map(cat => catMap[cat]).filter(Boolean)
  })));

  console.log(`Inserted ${products.length} products.`);

  // 7) Finish up
  await mongoose.disconnect();
  console.log('Seeding complete; disconnected from MongoDB.');
}

main().catch(err => {
  console.error('Error during seeding:', err);
  process.exit(1);
});
