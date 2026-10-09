// const Product = require("../models/productModel");

// const productModel = require("../models/productModel");

// const getProducts = async (req, res) => {
//     try {
//         const products = await Product.find({});
//         return res.send(products);
//     } catch (error) {
//         return res.status(500).send({ message: "Unable to get products." });
//     }
// };

// const getProductById = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         if (product) return res.send(product);
//         return res.status(404).send({ message: "404 product not found" });
//     } catch (error) {
//         return res.status(404).send({ message: "404 product not found" });
//     }
// };

// const createProduct = async (req, res) => {
//     try {
//         // Build a Mongoose document from the submitted form, then save it.
//         const product = new Product({
//             name: req.body.name,
//             price: req.body.price,
//             image: req.body.image,
//             brand: req.body.brand,
//             category: req.body.category,
//             countInStock: req.body.countInStock,
//             description: req.body.description,
//             rating: req.body.rating,
//             numReviews: req.body.numReviews
//         });
//         const newProduct = await product.save();
//         if (newProduct) return res.status(201).send({ message: "New Product Created", data: newProduct });
//         return res.status(500).send({ message: "Error in Creating Product." });
//     } catch (error) {
//         return res.status(400).send({ message: "Invalid product data." });
//     }
// };

// const updateProduct = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         if (!product) return res.status(404).send({ message: "Error in Updating Product." });

//         // Copy the submitted fields onto the existing product and save it.
//         product.name = req.body.name;
//         product.price = req.body.price;
//         product.image = req.body.image;
//         product.brand = req.body.brand;
//         product.category = req.body.category;
//         product.countInStock = req.body.countInStock;
//         product.description = req.body.description;

//         const updatedProduct = await product.save();
//         return res.status(200).send({ message: "Product Updated", data: updatedProduct });
//     } catch (error) {
//         return res.status(400).send({ message: "Invalid product data." });
//     }
// };

// const deleteProduct = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         if (!product) return res.status(404).send({ message: "Error in deleting Product." });
//         await product.deleteOne();
//         return res.send({ message: "Product Deleted" });
//     } catch (error) {
//         return res.status(404).send({ message: "Error in deleting Product." });
//     }
// };

// module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };


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