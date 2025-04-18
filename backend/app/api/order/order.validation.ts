import { body } from "express-validator";


export const createOrder = [
  body("user_id")
    .notEmpty().withMessage("user_id is required")
    .isInt({ gt: 0 }).withMessage("user_id must be a positive integer"),

  body("items")
    .isArray({ min: 1 }).withMessage("items must be a non-empty array"),

  body("items.*.product_id")
    .notEmpty().withMessage("product_id is required in each item")
    .isInt({ gt: 0 }).withMessage("product_id must be a positive integer"),

  body("items.*.quantity")
    .notEmpty().withMessage("quantity is required in each item")
    .isInt({ gt: 0 }).withMessage("quantity must be a positive integer"),

  body("items.*.price")
    .notEmpty().withMessage("price is required in each item")
    .isFloat({ gt: 0 }).withMessage("price must be a number greater than 0"),

  body("items.*.discount_price")
    .optional()
    .isFloat({ min: 0 }).withMessage("discount_price must be a non-negative number"),

  body("total_price")
    .notEmpty().withMessage("total_price is required")
    .isFloat({ gt: 0 }).withMessage("total_price must be greater than 0"),

  body("shipping_address")
    .notEmpty().withMessage("shipping_address is required")
    .isString().withMessage("shipping_address must be a string"),

  body("payment_status")
    .notEmpty().withMessage("payment_status is required")
    .isIn(["pending", "paid", "failed", "refunded"]).withMessage("payment_status must be one of: pending, paid, failed, refunded"),

  body("order_status")
    .notEmpty().withMessage("order_status is required")
    .isIn(["pending", "completed", "cancelled", "shipped"]).withMessage("order_status must be one of: pending, completed, cancelled, shipped"),

  body("coupon_code")
    .optional()
    .isString().withMessage("coupon_code must be a string"),

  body("discount_amount")
    .optional()
    .isFloat({ min: 0 }).withMessage("discount_amount must be a non-negative number"),

  body("shipping_cost")
    .notEmpty().withMessage("shipping_cost is required")
    .isFloat({ min: 0 }).withMessage("shipping_cost must be a non-negative number"),

  body("delivery_date")
    .notEmpty().withMessage("delivery_date is required")
    .isISO8601().withMessage("delivery_date must be a valid date"),
];


export const updateOrder = [...createOrder];


export const editOrder = [
  body("user_id").optional().isInt({ gt: 0 }).withMessage("user_id must be a positive integer"),

  body("items").optional().isArray().withMessage("items must be an array"),

  body("items.*.product_id").optional().isInt({ gt: 0 }).withMessage("product_id must be a positive integer"),
  body("items.*.quantity").optional().isInt({ gt: 0 }).withMessage("quantity must be a positive integer"),
  body("items.*.price").optional().isFloat({ gt: 0 }).withMessage("price must be greater than 0"),
  body("items.*.discount_price").optional().isFloat({ min: 0 }).withMessage("discount_price must be non-negative"),

  body("total_price").optional().isFloat({ gt: 0 }).withMessage("total_price must be greater than 0"),
  body("shipping_address").optional().isString().withMessage("shipping_address must be a string"),
  body("payment_status").optional().isIn(["pending", "paid", "failed", "refunded"]).withMessage("Invalid payment_status"),
  body("order_status").optional().isIn(["pending", "completed", "cancelled", "shipped"]).withMessage("Invalid order_status"),
  body("coupon_code").optional().isString().withMessage("coupon_code must be a string"),
  body("discount_amount").optional().isFloat({ min: 0 }).withMessage("discount_amount must be non-negative"),
  body("shipping_cost").optional().isFloat({ min: 0 }).withMessage("shipping_cost must be non-negative"),
  body("delivery_date").optional().isISO8601().withMessage("delivery_date must be a valid date"),
];
