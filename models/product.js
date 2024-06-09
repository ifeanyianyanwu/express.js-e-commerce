const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

const Cart = require("./cart");

const p = path.join(rootDir, "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      let updatedProducts = [...products];
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (p) => p.id === this.id
        );
        updatedProducts[existingProductIndex] = this;
      } else {
        this.id = Math.random().toString();
        updatedProducts.push(this);
      }

      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        console.log(err);
      });
    });
  }

  static getById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static deleteById(id, cb) {
    getProductsFromFile((products) => {
      const filteredProducts = products.filter((p) => p.id !== id);
      const product = products.find((p) => p.id === id);

      fs.writeFile(p, JSON.stringify(filteredProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
};
