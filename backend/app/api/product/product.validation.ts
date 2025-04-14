import { body } from "express-validator";

// Create Product Validation
export const createProduct = [
  body("name")
    .notEmpty().withMessage("name is required")
    .isString().withMessage("name must be a string"),

  body("description")
    .notEmpty().withMessage("description is required")
    .isString().withMessage("description must be a string"),

  body("price")
    .notEmpty().withMessage("price is required")
    .isFloat({ gt: 0 }).withMessage("price must be a number greater than 0"),

  body("stockQuantity")
    .notEmpty().withMessage("stockQuantity is required")
    .isInt({ min: 0 }).withMessage("stockQuantity must be a non-negative integer"),

  body("categoryId")
    .notEmpty().withMessage("categoryId is required")
    .isInt({ gt: 0 }).withMessage("categoryId must be a positive integer"),

  body("discountPrice")
    .optional()
    .isFloat({ min: 0 }).withMessage("discountPrice must be a non-negative number"),

  body("images")
    .optional()
    .isArray().withMessage("images must be an array of strings"),
  body("images.*")
    .optional()
    .isString().withMessage("each image must be a string"),

  body("brand")
    .optional()
    .isString().withMessage("brand must be a string"),

  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 }).withMessage("rating must be between 0 and 5"),

  body("tags")
    .optional()
    .isArray().withMessage("tags must be an array of strings"),
  body("tags.*")
    .optional()
    .isString().withMessage("each tag must be a string"),

  body("status")
    .optional()
    .isIn(["active", "inactive", "discontinued"]).withMessage("status must be one of: active, inactive, discontinued"),
];

// Update Product Validation – same as create for PUT (full update)
export const updateProduct = [...createProduct];

// Edit Product Validation – PATCH (partial update)
export const editProduct = [
  body("name").optional().isString().withMessage("name must be a string"),
  body("description").optional().isString().withMessage("description must be a string"),
  body("price").optional().isFloat({ gt: 0 }).withMessage("price must be greater than 0"),
  body("discountPrice").optional().isFloat({ min: 0 }).withMessage("discountPrice must be a non-negative number"),
  body("stockQuantity").optional().isInt({ min: 0 }).withMessage("stockQuantity must be a non-negative integer"),
  body("categoryId").optional().isInt({ gt: 0 }).withMessage("categoryId must be a positive integer"),

  body("images").optional().isArray().withMessage("images must be an array of strings"),
  body("images.*").optional().isString().withMessage("each image must be a string"),

  body("brand").optional().isString().withMessage("brand must be a string"),
  body("rating").optional().isFloat({ min: 0, max: 5 }).withMessage("rating must be between 0 and 5"),

  body("tags").optional().isArray().withMessage("tags must be an array of strings"),
  body("tags.*").optional().isString().withMessage("each tag must be a string"),

  body("status").optional().isIn(["active", "inactive", "discontinued"]).withMessage("status must be one of: active, inactive, discontinued"),
];
