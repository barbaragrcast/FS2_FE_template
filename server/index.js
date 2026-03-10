
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


const apiRouter = express.Router();

async function getCart(res) {
  try {
    const [rows] = await db.execute(
      "SELECT id, name, description, price, image_url FROM cart"
    );
    res.status(200).json({ rows });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
}


apiRouter.get('/health', (req, res) => res.json({ ok: true }));

apiRouter.get("/products", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, description, image_url, price FROM products"
    );
    res.status(200).json({ rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});


apiRouter.get("/products/search", async (req, res) => {
  const searchTerm = req.query.search || '';
  const sql = 'SELECT * FROM products WHERE name LIKE ?';
  try {
    const [rows] = await db.query(sql, [`%${searchTerm}%`]);
    res.status(200).json({ rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});


apiRouter.get("/cart", async (req, res) => {
  await getCart(res);
});


apiRouter.post("/cart", async (req, res) => {
  const { name, price, description, image_url } = req.body;
  const sql = "INSERT INTO cart(name, price, description, image_url) VALUES (?, ?, ?, ?)";
  try {
    const [result] = await db.execute(sql, [name, price, description, image_url]);
    res.status(201).json({ response: "Added to cart", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});


apiRouter.delete("/cart/:id", async (req, res) => {
  const sql = "DELETE FROM cart WHERE id = ?";
  try {
    await db.execute(sql, [req.params.id]);
    await getCart(res); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete from cart" });
  }
});


apiRouter.post('/submit-form', async (req, res) => {
  const { firstname, lastname, email, subject } = req.body;
  if (!firstname || !lastname || !email || !subject) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `
    INSERT INTO contact_forms (First_name, Last_name, Email, message)
    VALUES (?, ?, ?, ?)
  `;
  try {
    const [result] = await db.execute(sql, [firstname, lastname, email, subject]);
    res.status(201).json({ message: "Form data inserted!", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error." });
  }
});


app.use("/api", apiRouter);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));