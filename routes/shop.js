const express = require("express");
const path = require("path");
const rootDir = require("../util/path");

const router = express.Router();

const adminData = require("./admin");

router.get("/", (req, res, next) => {
  res.render("shop", { prods: adminData.products, docTitle: "Shop" });

  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  // res.send(`<html><body><p>${adminData.products[0]?.title}</p></body> </html>`);
});

module.exports = router;
