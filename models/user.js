const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex(
    (cp) => cp.productId.toString() === product._id.toString()
  );
  const updatedCartItems = [...this.cart.items];
  if (cartProductIndex >= 0) {
    updatedCartItems[cartProductIndex].quantity += 1;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: 1,
    });
  }
  this.cart = { items: updatedCartItems };
  return this.save();
};

userSchema.methods.removeFromCart = function (prodId) {
  const updatedCartItems = this.cart.items.filter(
    (c) => c.productId.toString() !== prodId
  );
  this.cart.items = updatedCartItems;

  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart.items = [];
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
