const express = require('express');
const products = require('./data/product');

const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id == req.params.id);
  console.log(product);
  res.json(product);
});

app.listen(5000, console.log(`server started on port 3000`));
