const { check, validationResult } = require("express-validator");

exports.validateProduct = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ max: 255 })
    .withMessage("Name must be less than 255 characters"),

  check("description").trim().notEmpty().withMessage("Description is required"),

  check("price")
    .isFloat({ min: 0.01 })
    .withMessage("Price must be a positive number"),

  check("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive integer"),

  check("categoryId").isInt().withMessage("Invalid category ID"),

  check("images").optional().isArray().withMessage("Images must be an array"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];
