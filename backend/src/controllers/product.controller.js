const productModel = require("../models/productModel");



const getProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        return res.send(products);
    } catch (error) {
        return res.status(500).send({ message: "Unable to get products." });
    }
};


   const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (product) return res.send(product);
        return res.status(404).send({ message: "404 product not found" });
    } catch (error) {
        return res.status(404).send({ message: "404 product not found" });
    }
};



const createProduct = async (req, res) => {
  try {
    const { name,image,brand, price, category,description, countInStock,rating ,numReviews} = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const product = await productModel.create({ name,image,brand, price, category,description, countInStock,rating ,numReviews });

    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = { getProducts, createProduct, getProductById,createProduct, updateProduct, deleteProduct };