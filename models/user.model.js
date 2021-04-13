const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  role: {type: String,  enum: ["client", "seller"]},
  name: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}    
  },
  brand: {type: ObjectId},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  phone: {type: String, required: true},
  address: {
    city:{type: String, required: true},
    street:{type: String, required: true},
    postCode:{type: Number, required:true},
  },
  currentCart: [
    {
      productId: { type: ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],


}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});


const User = mongoose.model('User', userSchema);

module.exports = User;