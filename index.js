const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const appError = require("./appError");

mongoose
  .connect("mongodb://127.0.0.1:27017/Express-Mongoose")
  .then(() => {
    console.log("Connecting to the mongoose");
  })
  .catch((err) => {
    console.log("Mongoose me error hai!");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const Product = require("./model/product.js");
const categories = ["fruit", "vegetable", "dairy"];

app.get("/product", async (req, res) => {
  const products = await Product.find({});
  // console.log(products);
  // res.send("All PRODUCTS ARE HERE!!!");

  res.render("products/index", { products });
});

app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});

app.get("/product/:id", async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  // res.send("Details");
  if (!product) {
    return next(new appError("Product not Found", 404));
  }
  res.render("products/show", { product });
});

app.post("/product", async (req, res) => {
  const new_product = new Product(req.body);
  await new_product.save();
  res.redirect(`/product/${new_product._id}`);
});

app.get("/product/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product, categories });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  console.log(req.body);
  res.redirect(`/product/${product._id}`);
});

app.delete("/product/:id", async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await Product.findByIdAndDelete(id);
  res.redirect("/product");
});

// app.get("/error", (req, res) => {
//   chicken.fly();
// });

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("Listening to the port 3000");
});
