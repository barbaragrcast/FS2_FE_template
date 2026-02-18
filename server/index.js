require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.post('/submit-form', (req, res) => {
  const { firstname, lastname, email, subject } = req.body;
  if (!firstname || !lastname || !email || !subject) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const sql = `
    INSERT INTO contact_forms (First_name, Last_name, Email, message)
    VALUES (?, ?, ?, ?)
  `;
  db.execute(sql, [firstname, lastname, email, subject])
    .then(([results]) => res.status(201).json({ message: "Form data inserted!", id: results.insertId }))
    .catch((err) => res.status(500).json({ message: "Database error." }));
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/products', async (req, res) => {
  const sql = 'SELECT id, name, description, image_url, price FROM products';
  try {
    const [rows] = await db.query(sql);
    res.status(200).json({ rows });
  } catch (err) {
    res.status(500).json({ message: "Database error" });
  }
});

app.get("/api/ecommerce/products", async (req, res) => {
  const sql = 'SELECT id, name, description, image_url, price FROM products';
  try {
    const [rows] = await db.query(sql);
    res.status(200).json({ rows });
  } catch (err) {
    res.status(500).json({ message: "Database error" });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
