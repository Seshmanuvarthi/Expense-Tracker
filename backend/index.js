// index.js
const express = require('express');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Log Environment Variables
console.log("🔍 ENV TEST:", {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME
});

// ✅ Root Endpoint
app.get('/', (req, res) => {
  res.send('Expense Tracker API is running 🚀');
});

// ✅ Signup Route
app.post('/api/signup', async (req, res) => {
  console.log("📩 Signup Request Body:", req.body);

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    console.log("❌ Missing fields");
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("❌ DB Insert Error:", err);
        return res.status(500).json({ error: 'Email already exists or server error' });
      }
      console.log("✅ User registered successfully");
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error("❌ Signup Error:", error.message);
    res.status(500).json({ error: 'Signup failed' });
  }
});

// ✅ Login Route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid email or password' });

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, email: user.email }, 'secret123', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token, id: user.id });
  });
});

// ✅ Get Expense History for a User
app.get('/api/expenses', (req, res) => {
  const user_id = req.query.user_id;
  if (!user_id) {
    return res.status(400).json({ error: 'Missing user_id query parameter' });
  }

  const sql = `
    SELECT id, amount, title, expense_date, category
    FROM expenses
    WHERE user_id = ?
    ORDER BY expense_date DESC
  `;

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error('❌ DB Fetch Expenses Error:', err);
      return res.status(500).json({ error: 'Failed to fetch expenses' });
    }
    res.json(results);
  });
});

// ✅ Get Categories
app.get('/api/categories', (req, res) => {
  const sql = 'SELECT * FROM categories ORDER BY category_name ASC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ DB Fetch Categories Error:', err);
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
    res.json(results);
  });
});

// ✅ Add Category
app.post('/api/categories', (req, res) => {
  const { category_name } = req.body;
  if (!category_name) {
    return res.status(400).json({ error: 'Category name is required' });
  }

  const sql = 'INSERT INTO categories (category_name) VALUES (?)';
  db.query(sql, [category_name], (err, result) => {
    if (err) {
      console.error('❌ DB Insert Category Error:', err);
      return res.status(500).json({ error: 'Failed to add category' });
    }
    res.status(201).json({ message: 'Category added successfully', category_id: result.insertId });
  });
});

// POST /api/expenses - Add new expense
app.post('/api/expenses', (req, res) => {
  const { user_id, title, amount, category, expense_date } = req.body;

  if (!user_id || !title || !amount || !category || !expense_date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = 'INSERT INTO expenses (user_id, title, amount, category, expense_date) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [user_id, title, amount, category, expense_date], (err, result) => {
    if (err) {
      console.error('❌ DB Insert Expense Error:', err.sqlMessage || err);
      return res.status(500).json({ error: 'Failed to add expense' });
    }
    res.status(201).json({ message: 'Expense added successfully', expenseId: result.insertId });
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
