import { body } from "express-validator";

export const createCategory = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isString()
    .withMessage("title must be a string"),
];

export const updateCategory = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isString()
    .withMessage("title must be a string"),
];

export const editCategory = [
  body("title").isString().withMessage("title must be a string"),
];
