const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const brandSchema = new Schema({
  name: { type: String, required: true, unique: true },
  nameUrl: { type: String, required: true, unique: true },
  brandPic: { type: String, unique: true },
  products: [
    {
      productId: { type: ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
