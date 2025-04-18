

import { body } from "express-validator";

// Create Coupon Validation
export const createCoupon = [
  body("code")
    .notEmpty()
    .withMessage("Coupon code is required")
    .isString()
    .withMessage("Coupon code must be a string"),

  body("discount_type")
    .notEmpty()
    .withMessage("Discount type is required")
    .isIn(["PERCENTAGE", "FLAT"])
    .withMessage("Discount type must be 'PERCENTAGE' or 'FLAT'"),

  body("discount_percent")
    .notEmpty()
    .withMessage("Discount percent is required")
    .isFloat({ min: 0 })
    .withMessage("Discount percent must be a non-negative number"),

  body("expires_at")
    .optional()
    .isISO8601()
    .withMessage("expires_at must be a valid date"),

  body("is_active")
    .optional()
    .isBoolean()
    .withMessage("is_active must be a boolean"),
];

// Update Coupon Validation
export const updateCoupon = [
  body("code")
    .optional()
    .isString()
    .withMessage("Coupon code must be a string"),

  body("discount_type")
    .optional()
    .isIn(["PERCENTAGE", "FLAT"])
    .withMessage("Discount type must be 'PERCENTAGE' or 'FLAT'"),

  body("discount_percent")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount percent must be a non-negative number"),

  body("expires_at")
    .optional()
    .isISO8601()
    .withMessage("expires_at must be a valid date"),

  body("is_active")
    .optional()
    .isBoolean()
    .withMessage("is_active must be a boolean"),
];


export const editCoupon = updateCoupon;
