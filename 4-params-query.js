const express = require("express");
const app = express();
const { products } = require("./data");

app.get("/", (req, res) => {
  res.send('<h1>Home Page</h1><a href="/api/products/1">Product 1</a>');
});

app.get("/api/products", (req, res) => {
  const newProduct = products.map(({ id, name, image }) => {
    return { id, name, image };
  });
  res.json(newProduct);
});

app.get("/api/products/:productId", (req, res) => {
  console.log(req.params);
  const {
    params: { productId = "" },
  } = req;
  console.log(productId);
  const singleProduct = products.find(
    (product) => product.id === Number(productId)
  );
  if (!singleProduct) {
    return res.status(404).send("Product doesnot exist");
  }
  res.json(singleProduct);
});

app.get("/api/products/:productId/reviews/:reviewId", (req, res) => {
  console.log(req.params);
  res.send("Hello World");
});

app.get("/api/v1/query", (req, res) => {
  console.log(req.query);
  const {
    query: { search, limit },
  } = req;
  let sortedProducts = [...products];
  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (sortedProducts.length < 1) {
    // res.status(200).send("No products found");
    return res.status(200).json({ sucess: true, data: [] });
  }
  res.status(200).json(sortedProducts);
  //   res.send("Hello world1");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000....");
});
