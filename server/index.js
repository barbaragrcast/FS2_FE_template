require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const e = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Using mysql2 + dotenv
// TODO: Configure this pool with your schema credentials from Lesson 9.
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// TODO: Implement /submit-form to handle form data and insert into your database
app.post('/submit-form', (req, res) => {
  const { firstname, lastname, email, subject} = req.body;
  if (!firstname || !lastname || !email|| !subject) {
    return res.status(400).json( {message: "All fields are required"});
  }
const sql = `
  INSERT INTO contact_forms (First_name, Last_name, Email, message)
  VALUES (?, ?, ?, ?)
`;


  db. execute(sql, [firstname, lastname, email, subject], (err, results) => {
    if(err){
      console.error("DB insert error:", err);
      return res.status(500).json({message: "Database error."})
    }
    return res
      .status(201)
      .json({message: "form data inserted!", id: results.insertId});
  });
});

// Optional: quick health check
app.get('/health', (req, res) => res.json({ ok: true }));
app.get('/products', async(req, res) =>{
  const sql = 'SELECT id, name, description, image_url, price FROM products';
})

try {
  const [response] = await db.query(sql)
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({rows: response})
} catch (e){
  console.error("error fetching products", err);
  return res.status(500).json({message: "Database error"})
}


app.get("/api/ecommerce/products", (req, res) => {
  const sql = "SELECT id, name, description, image_url, price from products"
  db.query(sql, (err, result) => {
    if (err) {
      console.error("OH NO");
      res.status(500).json({message: "something awful happened"})
    } else {
      res.status(200).json({rows: result});
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
