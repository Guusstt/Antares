// Mock API service untuk simulasi interaksi dengan backend

const DELAY = 800; // Simulasi network delay

// Data dummy untuk obat-obatan
const medicines = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    price: 15000,
    category: 'otc',
    image: 'https://via.placeholder.com/200x200',
    description: 'Obat pereda nyeri dan demam. Dapat digunakan untuk meringankan sakit kepala, nyeri otot, dan demam.',
    dosage: 'Dewasa: 1-2 tablet setiap 4-6 jam sesuai kebutuhan. Maksimal 8 tablet per hari.',
    sideEffects: 'Jarang terjadi: ruam kulit, gangguan fungsi hati pada dosis tinggi',
    stock: 100
  },
  {
    id: 2,
    name: 'Amoxicillin 500mg',
    price: 25000,
    category: 'prescription',
    image: 'https://via.placeholder.com/200x200',
    description: 'Antibiotik untuk mengatasi infeksi bakteri pada saluran pernapasan, telinga, saluran kemih, dan kulit.',
    dosage: 'Dewasa: 250-500mg setiap 8 jam. Anak-anak: Dosis berdasarkan berat badan.',
    sideEffects: 'Diare, mual, ruam kulit, reaksi alergi',
    stock: 80
  },
  {
    id: 3,
    name: 'Vitamin C 1000mg',
    price: 30000,
    category: 'vitamins',
    image: 'https://via.placeholder.com/200x200',
    description: 'Suplemen untuk meningkatkan daya tahan tubuh dan membantu penyerapan zat besi.',
    dosage: 'Dewasa: 1 tablet sehari',
    sideEffects: 'Dosis tinggi dapat menyebabkan gangguan pencernaan ringan',
    stock: 150
  },
  {
    id: 4,
    name: 'Minyak Kayu Putih 60ml',
    price: 20000,
    category: 'personal-care',
    image: 'https://via.placeholder.com/200x200',
    description: 'Minyak esensial untuk meredakan gejala masuk angin, gatal akibat gigitan serangga, dan nyeri otot.',
    dosage: 'Oleskan secukupnya pada area yang diinginkan',
    sideEffects: 'Dapat menyebabkan iritasi pada kulit sensitif',
    stock: 120
  },
  {
    id: 5,
    name: 'Omeprazole 20mg',
    price: 35000,
    category: 'prescription',
    image: 'https://via.placeholder.com/200x200',
    description: 'Obat untuk mengurangi produksi asam lambung. Digunakan untuk mengatasi maag, GERD, dan tukak lambung.',
    dosage: 'Dewasa: 1 kapsul sehari sebelum makan',
    sideEffects: 'Sakit kepala, diare, nyeri perut',
    stock: 60
  },
  {
    id: 6,
    name: 'Loratadine 10mg',
    price: 18000,
    category: 'otc',
    image: 'https://via.placeholder.com/200x200',
    description: 'Antihistamin untuk meredakan gejala alergi seperti bersin, hidung tersumbat, dan gatal-gatal.',
    dosage: 'Dewasa dan anak >12 tahun: 1 tablet sehari',
    sideEffects: 'Mengantuk, mulut kering, sakit kepala',
    stock: 90
  },
  {
    id: 7,
    name: 'Multivitamin Kompleks',
    price: 45000,
    category: 'vitamins',
    image: 'https://via.placeholder.com/200x200',
    description: 'Kombinasi berbagai vitamin dan mineral esensial untuk menjaga kesehatan tubuh secara keseluruhan.',
    dosage: 'Dewasa: 1 tablet sehari setelah makan',
    sideEffects: 'Umumnya aman, dapat menyebabkan gangguan pencernaan ringan',
    stock: 110
  },
  {
    id: 8,
    name: 'Salep Luka Bakar',
    price: 28000,
    category: 'personal-care',
    image: 'https://via.placeholder.com/200x200',
    description: 'Salep untuk membantu penyembuhan luka bakar ringan dan mencegah infeksi.',
    dosage: 'Oleskan tipis pada area yang terkena luka bakar 2-3 kali sehari',
    sideEffects: 'Jarang terjadi: iritasi lokal, kemerahan',
    stock: 75
  }
];

// Mock users untuk simulasi login/register
let users = [
  {
    id: 1,
    name: 'User Test',
    email: 'user@test.com',
    password: 'password123'
  }
];

// Mock orders
let orders = [];
let orderCounter = 1;

// Helper function untuk menunda eksekusi (simulasi network latency)
const delay = (ms = DELAY) => new Promise(resolve => setTimeout(resolve, ms));

// API Functions
export const getMedicines = async () => {
  await delay();
  return [...medicines];
};

export const getMedicineById = async (id) => {
  await delay();
  const medicine = medicines.find(m => m.id === parseInt(id));
  if (!medicine) {
    throw new Error('Medicine not found');
  }
  return { ...medicine };
};

export const login = async (email, password) => {
  await delay();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  // Return user data without password
  const { password: _, ...userData } = user;
  return userData;
};

export const register = async (name, email, password) => {
  await delay();
  // Check if email already exists
  if (users.some(u => u.email === email)) {
    throw new Error('Email already in use');
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password
  };
  
  users.push(newUser);
  
  // Return user data without password
  const { password: _, ...userData } = newUser;
  return userData;
};

export const createOrder = async (orderData) => {
  await delay();
  
  const newOrder = {
    ...orderData,
    id: orderCounter,
    orderNumber: `ORD-${Date.now()}`,
    status: 'pending'
  };
  
  orders.push(newOrder);
  orderCounter++;
  
  return {
    success: true,
    orderNumber: newOrder.orderNumber
  };
};