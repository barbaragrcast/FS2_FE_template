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
app.use("/api", apiRouter);

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

apiRouter.post("/cart", (req,res) => {
  const sql = "INSERT INTO cart(name, price, description, image_url) values (?, ?, ?, ?)"
  const {name, price, description, image_url} = req.body;
  db.execute(sql, [name, price, description, image_url], (err, result) => {
    if (err) {
      console.log("ERROR", err);
      res.status(500).json({error: "OH NO!!"})
    }
    res.status(201).json({response: "Added to cart"});
  });
})

function getCart(res){
  const sql = "select id, name, description, price, image_url from cart";
  db.execute(sql, (err, result) => {
    if (err) {
      console.error("OH NO", err);
      res.status(500).json({error: "Something Horrible"});
    } else {
      console.log(result)
      res.status(200).json({rpws: result});
    }
  })
}

app.get("/api/ecommerce/products", (req, res) => {
  const searchTerm = req.query.search || '';
  const sql = 'SELECT * FROM products WHERE name LIKE ?';
  const values = [`%${searchTerm}%`];
  db.query(sql, values, (err, result) => {
    res.setHeader("Content-Type", "application/json");
    res.json(result);
  })
});

//shopping cart
app.get("/api/ecommerce/cart", (req, res) => {
  const sql = 'SELECT * FROM cart';
  db.query(sql, (err, result) => {
    if (err){
      console.log(err);
      res.status(500).send("Server error");
      return;
    }
    res.setHeader("Content-Type", "application/json");
    res.json(result);
  })
});



api.Router.get("/cart", (req, res) => {
  getCart(res);
})


apiRouter.delete("/cart/:id", (req, res) => {
  const sql = "delete from cart where id = (?)";
  db.execute(sql, [req.params.id], (err, result) => {
    getCart(res);
  })
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
