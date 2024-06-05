const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const exsitingProductIndex = cart.products.findIndex((p) => p.id === id);
      const exsitingProduct = cart.products[exsitingProductIndex];

      let updatedProduct;

      if (exsitingProduct) {
        updatedProduct = { ...exsitingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products[exsitingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;

      fs.writeFile(p, JSON.stringify(cart), (error) => {
        console.log(error);
      });
    });
  }
};
