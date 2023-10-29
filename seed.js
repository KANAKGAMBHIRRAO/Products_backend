const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/Express-Mongoose")
  .then(() => {
    console.log("Connecting to the mongoose");
  })
  .catch((err) => {
    console.log("Mongoose me error hai!");
    console.log(err);
  });

const Product = require("./model/product.js");

// const p = new Product({ name: "tomato", price: 90, category: "vegetable" });
// p.save()
//   .then((p) => {
//     console.log(p);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const seedProducts = [
  {
    name: "Fairy Eggplant",
    price: 1.0,
    category: "vegetable",
  },
  {
    name: "Organic Goddess Melon",
    price: 4.99,
    category: "fruit",
  },
  {
    name: "Organic Mini Seedless Watermelon",
    price: 3.99,
    category: "fruit",
  },
  {
    name: "Organic Celery",
    price: 1.5,
    category: "vegetable",
  },
  {
    name: "Chocolate Whole Milk",
    price: 2.69,
    category: "dairy",
  },
];

Product.insertMany(seedProducts)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
