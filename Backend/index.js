const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

// Inisialisasi Model
const prisma = new PrismaClient();
const app = express();

// Middleware biar Vue.js di port beda bisa akses API ini
app.use(cors());
app.use(express.json());

// --- PRESENTER: Logika untuk rute /api/menus ---
app.get('/api/menus', async (req, res) => {
  try {
    // Meminta Model untuk ambil semua kategori beserta produk di dalamnya
    const categories = await prisma.category.findMany({
      include: {
        products: true,
      },
    });

    // --- VIEW: Mengirimkan hasil dalam bentuk JSON ---
    res.json(categories);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
});

// Menyalakan server di port 3000
app.listen(3000, () => {
  console.log('Backend kebab nyala di http://localhost:3000');
});
