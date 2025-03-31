//  //Import models and database configuration
// const db = require('../config/db'); // Import db.js to ensure associations are loaded
// const Product = require('../models/Product');
// const Category = require('../models/Category');
// const { Op } = require("sequelize");
// // // Add a product (Admin only)
// // const addProduct = async (req, res) => {
// //   const { name, description, price, stock, categoryId } = req.body;
// //   try {
// //     // Check if the categoryId exists
// //     const category = await Category.findByPk(categoryId);
// //     if (!category) {
// //       return res.status(404).json({ message: 'Category not found' });
// //     }

// //     // Create product and associate with categoryId
// //     const product = await Product.create({
// //       name,
// //       description,
// //       price,
// //       stock,
// //       category_id: categoryId, // Ensure the categoryId is correctly set
// //     });

// //     res.status(201).json(product);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error', error });
// //   }
// // };


// // Add a product (Admin only) - Enhanced version
// const addProduct = async (req, res) => {
//   const { name, description, price, stock, categoryId, images } = req.body;

//   // Basic validation
//   if (!name || !description || !price || !categoryId) {
//     return res.status(400).json({
//       success: false,
//       message: "Missing required fields",
//     });
//   }

//   try {
//     // Check if the category exists
//     const category = await Category.findByPk(categoryId);
//     if (!category) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     // Process images - convert array to JSON string if needed
//     const processedImages = Array.isArray(images)
//       ? JSON.stringify(images)
//       : images || "[]";

//     // Generate slug
//     const slug = name
//       .toLowerCase()
//       .replace(/\s+/g, "-")
//       .replace(/[^\w-]+/g, "");

//     const product = await Product.create({
//       name,
//       description,
//       price,
//       stock,
//       category_id: categoryId,
//       images: processedImages, // Store as JSON string
//       // slug,
//     });

//     res.status(201).json({
//       success: true,
//       data: {
//         ...product.toJSON(),
//         images: JSON.parse(processedImages), // Return as array
//       },
//     });
//   } catch (error) {
//     console.error("Error adding product:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to add product",
//       error: process.env.NODE_ENV === "development" ? error.message : undefined,
//     });
//   }
// };
// // // Get all products (For customers)
// // const getAllProducts = async (req, res) => {
// //   try {
// //     const products = await Product.findAll({
// //       include: [{ model: Category }] // Include Category model with proper association
// //     });
// //     res.json(products);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error', error });
// //   }
// // };


// // Get all products - Enhanced with pagination and filtering
// const getAllProducts = async (req, res) => {
//   try {
//     const { page = 1, limit = Number(limit) || 10, status, category } = req.query;
//     const offset = (Number(page) - 1) * Number(limit);

//     const where = {};
//     if (status) where.status = status;
//     if (category) where.category_id = category;

//     const { count, rows } = await Product.findAndCountAll({
//       where,
//       include: [{ model: Category }],
//       limit: Number(limit) || 10,
//       offset: offset || 0,
//       order: [["createdAt", "DESC"]],
//     });

//     res.json({
//       success: true,
//       data: rows,
//       pagination: {
//         totalItems: count,
//         totalPages: Math.ceil(count / limit),
//         currentPage: parseInt(page),
//         itemsPerPage: parseInt(limit)
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to fetch products',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };
// // // Get a single product by ID (For customers)
// // const getProductById = async (req, res) => {
// //   const { id } = req.params;
// //   try {
// //     const product = await Product.findByPk(id, {
// //       include: [{ model: Category }] // Include Category model with proper association
// //     });
// //     if (!product) return res.status(404).json({ message: 'Product not found' });

// //     res.json(product);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error', error });
// //   }
// // };
// const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findByPk(req.params.id, {
//       include: [{ model: Category }],
//       paranoid: false, // Include soft-deleted products if needed
//     });

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     // Process images
//     const images = product.images ? JSON.parse(product.images) : [];
//     const productWithImages = {
//       ...product.toJSON(),
//       images: images.map((img) => `/uploads/${img}`),
//     };

//     res.json({
//       success: true,
//       data: productWithImages,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: process.env.NODE_ENV === "development" ? error.message : undefined,
//     });
//   }
// };
// // Get products by category (For customers)
// const getProductsByCategory = async (req, res) => {
//   const { categoryId } = req.params;
//   try {
//     const products = await Product.findAll({
//       where: { category_id: categoryId },
//       include: [{ model: Category }] // Include Category model with proper association
//     });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to retrieve products by category', error });
//   }
// };

// // Edit a product (Admin only)
// const updateProduct = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const product = await Product.findByPk(id);
//     if (!product) return res.status(404).json({ message: 'Product not found' });

//     await product.update(req.body);
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // Delete a product (Admin only)
// const deleteProduct = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const product = await Product.findByPk(id);
//     if (!product) return res.status(404).json({ message: 'Product not found' });

//     await product.destroy();
//     res.json({ message: 'Product deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// module.exports = {
//   getAllProducts,
//   getProductById,
//   getProductsByCategory,
//   addProduct,
//   updateProduct,
//   deleteProduct,
// };
const Product = require('../models/Product');
const Category = require('../models/Category');
const { Op } = require("sequelize");
const db = require('../config/db');
// Helper function to process images
const processImages = (images) => {
  try {
    if (!images) return [];
    if (Array.isArray(images)) return images;
    return JSON.parse(images);
  } catch (error) {
    console.error('Error processing images:', error);
    return [];
  }
};

// Add a product (Admin only)
const addProduct = async (req, res) => {
  const { name, description, price, stock, categoryId, images } = req.body;

  // Validation
  if (!name || !description || !price || !categoryId) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: name, description, price, or categoryId",
    });
  }

  if (isNaN(price)) {
    return res.status(400).json({
      success: false,
      message: "Price must be a valid number",
    });
  }

  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock: stock || 0,
      category_id: categoryId,
      images: JSON.stringify(processImages(images)),
    });

    return res.status(201).json({
      success: true,
      data: {
        ...product.toJSON(),
        images: processImages(product.images),
        category: {
          id: category.id,
          name: category.name
        }
      },
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get all products with pagination and filtering
const getAllProducts = async (req, res) => {
  try {
    // Parse and validate parameters
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const offset = (page - 1) * limit;
    const { status, category } = req.query;

    const where = {};
    if (status) where.status = status;
    if (category) where.category_id = category;

    const { count, rows } = await Product.findAndCountAll({
      where,
      include: [{ 
        model: Category,
        attributes: ['id', 'name']
      }],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    const products = rows.map(product => ({
      ...product.toJSON(),
      images: processImages(product.images).map(img => `/uploads/${img}`),
      category: product.Category
    }));

    return res.json({
      success: true,
      data: products,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to fetch products',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ 
        model: Category,
        attributes: ['id', 'name']
      }],
      paranoid: false
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      data: {
        ...product.toJSON(),
        images: processImages(product.images).map(img => `/uploads/${img}`),
        category: product.Category
      }
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { category_id: req.params.categoryId },
      include: [{ 
        model: Category,
        attributes: ['id', 'name']
      }],
      order: [['createdAt', 'DESC']]
    });

    const formattedProducts = products.map(product => ({
      ...product.toJSON(),
      images: processImages(product.images).map(img => `/uploads/${img}`),
      category: product.Category
    }));

    return res.json({
      success: true,
      data: formattedProducts
    });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to retrieve products by category',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (req.body.images) {
      req.body.images = JSON.stringify(processImages(req.body.images));
    }

    await product.update(req.body);

    const updatedProduct = await Product.findByPk(req.params.id, {
      include: [{ model: Category }]
    });

    return res.json({
      success: true,
      data: {
        ...updatedProduct.toJSON(),
        images: processImages(updatedProduct.images).map(img => `/uploads/${img}`),
        category: updatedProduct.Category
      }
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await product.destroy();
    return res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  updateProduct,
  deleteProduct
};