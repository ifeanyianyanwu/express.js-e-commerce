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

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) return console.log(err);

      const cart = JSON.parse(fileContent);
      const updatedCart = { ...cart };

      const cartItem = updatedCart.products.find((p) => p.id === id);

      if (!cartItem) return;

      updatedCart.products = updatedCart.products.filter((p) => p.id !== id);
      updatedCart.totalPrice =
        updatedCart.totalPrice - cartItem.qty * productPrice;

      fs.writeFile(p, JSON.stringify(updatedCart), (error) => {
        console.log(error);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
