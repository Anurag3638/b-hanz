import express, { Router } from 'express';

import userModel from '../models/userModel.js';
import { isAdmin, requireSignIn } from '../middelware/authMiddelware.js';
import categoryModel from '../models/categoryModel.js';
import slugify from 'slugify';
import productModel from '../models/productModel.js';

const router = express.Router();

// Get all users
router.get('/users', requireSignIn, isAdmin, async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).send('Server error');
  }
});
router.put('/update-category/:id', requireSignIn, isAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
    res.status(200).send({
      success: true,
      message: "updated",
      category
    })
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/create-category', requireSignIn, isAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: 'Name is Required' })
    }
    const checkCategory = await categoryModel.findOne({ name });
    if (checkCategory) {
      return res.status(200).send({ message: 'category already exists' })
    }
    const category = await new categoryModel({ name, slug: slugify(name) }).save();


    res.status(201).send({
      success: true,
      message: 'category created',
      category
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/category/:slug', async (req, res) => {
  const { slug } = req.params;
  const categorySearch = await categoryModel.findOne({ slug });
  if (!categorySearch) {
    return res.status(404).send({
      success: false,
      message: "Category not found",
    });
  }

  const allProducts = await productModel.find({ category: categorySearch._id });
  res.status(200).send({
    success: true,
    message: "Category found successfully",
    categorySearch,
    allProducts
  });
});
router.get('/category/by-id/:id', async (req, res) => {
  const { id } = req.params;
  const categorySearch = await categoryModel.findById(id);

  if (!categorySearch) {
    return res.status(404).send({
      success: false,
      message: "Category not found",
    });
  }

  res.status(200).send({
    success: true,
    message: "Category found successfully",
    categorySearch
  });
});
router.get('/categories', async (req, res) => {
  const categorySearch = await categoryModel.find();
  res.status(200).send({
    success: true,
    message: "Category found successfully",
    categorySearch
  });
});


// for products




router.post('/add-product', requireSignIn, isAdmin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discount,
      rating,
      image,
      images,
      category,
      isNew,
      isBestSeller,
      stock,
      specifications
    } = req.body;

    // Validation
    if (!name || !description || !price || !image || !category || stock == null) {
      return res.status(400).send({ success: false, message: "Missing required fields" });
    }

    const product = new productModel({
      name,
      slug: slugify(name),
      description,
      price,
      discount,
      rating,
      image,
      images,
      category,
      isNew,
      isBestSeller,
      stock,
      specifications
    });

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product added successfully",
      product
    });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).send({
      success: false,
      message: "Error creating product",
      error: err.message
    });
  }
});



router.get('/product/:slug', async (req, res) => {
  const { slug } = req.params;
  const productSearch = await productModel.find({ slug }).limit(10);
  res.status(200).send({
    success: true,
    message: "product found successfully",
    productSearch
  });
});
router.get('/products', async (req, res) => {
  const products = await productModel.find();
  res.status(200).send(products);
});

router.get("/search", async (req, res) => {
  const search = await productModel.find(req.query);
  return res.status(200).send(search);
});


export default router;
