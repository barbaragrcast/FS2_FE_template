require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PostgreSQL connection
const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432, // default PostgreSQL port
});

// Utility to fetch cart
async function getCart(res) {
  try {
    const result = await db.query(
      "SELECT id, name, description, price, image_url FROM cart"
    );
    res.status(200).json({ rows: result.rows });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
}

const apiRouter = express.Router();

// Health check
apiRouter.get('/health', (req, res) => res.json({ ok: true }));

// Get all products
apiRouter.get("/products", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, name, description, image_url, price FROM products"
    );
    res.status(200).json({ rows: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// Search products
apiRouter.get("/products/search", async (req, res) => {
  const searchTerm = req.query.search || '';
  const sql = 'SELECT * FROM products WHERE name ILIKE $1'; // case-insensitive
  try {
    const result = await db.query(sql, [`%${searchTerm}%`]);
    res.status(200).json({ rows: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// Get cart items
apiRouter.get("/cart", async (req, res) => {
  await getCart(res);
});

// Add to cart
apiRouter.post("/cart", async (req, res) => {
  const { name, price, description, image_url } = req.body;
  const sql = `
    INSERT INTO cart(name, price, description, image_url)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;
  try {
    const result = await db.query(sql, [name, price, description, image_url]);
    res.status(201).json({ response: "Added to cart", id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// Remove from cart
apiRouter.delete("/cart/:id", async (req, res) => {
  const sql = "DELETE FROM cart WHERE id = $1";
  try {
    await db.query(sql, [req.params.id]);
    await getCart(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete from cart" });
  }
});

// Submit contact form
apiRouter.post('/submit-form', async (req, res) => {
  const { firstname, lastname, email, subject } = req.body;
  if (!firstname || !lastname || !email || !subject) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `
    INSERT INTO contact_forms (First_name, Last_name, Email, message)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;
  try {
    const result = await db.query(sql, [firstname, lastname, email, subject]);
    res.status(201).json({ message: "Form data inserted!", id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error." });
  }
});

// Use API router
app.use("/api", apiRouter);

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));