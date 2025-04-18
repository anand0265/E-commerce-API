import { body } from "express-validator";

export const createCart = [
  body("userId")
    .notEmpty()
    .withMessage("userId is required")
    .isNumeric()
    .withMessage("userId must be a number"),

  body("totalPrice")
    .notEmpty()
    .withMessage("totalPrice is required")
    .isFloat({ min: 0 })
    .withMessage("totalPrice must be a non-negative number"),

  body("items")
    .isArray({ min: 1 })
    .withMessage("items must be a non-empty array"),

  body("items.*.product")
    .notEmpty()
    .withMessage("product is required")
    .isNumeric()
    .withMessage("product must be a number"),

  body("items.*.name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),

  body("items.*.price")
    .notEmpty()
    .withMessage("price is required")
    .isFloat({ min: 0 })
    .withMessage("price must be a non-negative number"),

  body("items.*.quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("quantity must be a positive integer"),

  body("items.*.image")
    .optional()
    .isString()
    .withMessage("image must be a string"),

  body("items.*.stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("stock must be a non-negative integer"),
];

export const updateCart = [
  body("totalPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("totalPrice must be a non-negative number"),
];

export const editCart = [
  body("totalPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("totalPrice must be a non-negative number"),
];

