const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("67253fdf137cbff97a1208bb")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://anyanwuifeanyi001:ecommerce_db@cluster0.ao553vi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "delgo",
          email: "delgo@test.com",
          cart: { items: [] },
        });
        user.save();
      }
    });

    app.listen(3000);
    console.log("Connected");
  })
  .catch((err) => console.log(err));
