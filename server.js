const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 5000;
app.use(express.json());
const readProducts = () => {
  const data = fs.readFileSync("products.json");
  return JSON.parse(data);
};

const writeProducts = (data) => {
  fs.writeFileSync("products.json", JSON.stringify(data, null, 2));
};
app.get("/getProducts", (req, res) => {
  const products = readProducts();
  res.json(products);
});
app.post("/addProduct", (req, res) => {
  const { productId, productName, description, Stock } = req.body;
  const products = readProducts();
  const newProduct = {
    productId,
    productName,
    description,
    Stock
  };
  products.push(newProduct);
  writeProducts(products);
  res.json({ message: "Product added successfully", newProduct });
});
app.delete("/deleteProduct/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let products = readProducts();
  products = products.filter(product => product.productId !== id);
 writeProducts(products);
  res.json({ message: `Product with ID ${id} deleted successfully` });
});
app.put("/updateProduct/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const products = readProducts();
  const product = products.find(p => p.productId === id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  product.description =
    "Preferred by Both Vegetarians and Non Vegetarians";
  writeProducts(products);
  res.json({ message: "Product updated successfully", product });
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});