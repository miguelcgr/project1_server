const express = require("express");
const router = express.Router();

const createError = require("http-errors");

const Product = require("../models/product.model");


const { isLoggedIn, isAdmin } = require("../helpers/middleware");


router.post("/create", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const {
      name,
      brandId,
      price,
      materials,
      picture,
      stock,
    } = req.body;
console.log('materials', materials)
    const newProduct = await Product.create({
      name,
      brandId,
      price,
      materials,
      picture,
      stock,
    });

    res
      .status(201) 
      .json(newProduct);
  } catch (error) {
    next(createError(error)); 
  }
});

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find();

    if (!products) return next(createError(404)); 

    res.status(200).json(products);
  } catch (error) {
    next(createError(error)); 
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) return next(createError(404)); 

    res.status(200).json(product);
  } catch (error) {
    next(createError(error)); 
  }
});

router.post("/update/:id", isLoggedIn, isAdmin,  async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      name,
      brandId,
      price,
      materials,
      picture,
    } = req.body;

    const product = await Product.findByIdAndUpdate(
      
      id,
      {
        name,
        brandId,
        price,
        materials,
        picture,
      },
      { new: true }
    );

    if (!product) return next(createError(404)); 

    res.status(200).json(product);
  } catch (error) {
    next(createError(error)); 
  }
});


router.get("/delete/:id", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    if (!product) return next(createError(404)); 

    res.status(200).json(product);
  } catch (error) {
    next(createError(error)); // 500 Internal Server Error (by default)
  }
});


//get products by brandId
router.get("/brandId/:brandId",  async (req, res, next) => {
  try {
    const brandId = req.params.brandId;
    const product = await Product.find({"brandId": brandId}).populate('materials')

    if (!product) return next(createError(404)); 

    res.status(200).json(product);
  } catch (error) {
    next(createError(error)); 
  }
});


module.exports = router;