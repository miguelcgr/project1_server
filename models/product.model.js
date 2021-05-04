const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const productSchema = new Schema({
  name: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  materials: [
    {type: String},
  ],
  picture: {
    type: String,
    default: "https://findicons.com/files/icons/2502/food_icons/256/2.png",
  },
  description: {type: String, default: 'this is the description'},
  category: {type: String, enum : ['Home', 'Clothes', 'Other'], default: 'Other'},
  stock: Number,
  category: {type: String },
  description: {type: String, default: 'this is the description'},
 
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

        
