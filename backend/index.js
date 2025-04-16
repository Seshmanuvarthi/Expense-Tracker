// index.js
const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Expense Tracker API is running 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ✅ Signup Route
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, hashedPassword], (err, result) => {
    if (err) {
      console.error('Signup Error:', err.message);
      return res.status(500).json({ error: 'Email already exists or server error' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
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

    // Generate JWT Token (optional for frontend auth)
    const token = jwt.sign({ id: user.id, email: user.email }, 'secret123', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  });
});
