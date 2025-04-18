

import * as couponService from "./coupon.service";
import { createResponse } from "../../common/helper/response.helper";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

// Create a new coupon
export const createCoupon = asyncHandler(async (req: Request, res: Response) => {
  const result = await couponService.createCoupon(req.body);
  res.send(createResponse(result, "Coupon created successfully"));
});

// Update an existing coupon
export const updateCoupon = asyncHandler(async (req: Request, res: Response) => {
  const result = await couponService.updateCoupon(Number(req.params.id), req.body);
  res.send(createResponse(result, "Coupon updated successfully"));
});

// Delete a coupon
export const deleteCoupon = asyncHandler(async (req: Request, res: Response) => {
  const result = await couponService.deleteCoupon(Number(req.params.id));
  res.send(createResponse(result, "Coupon deleted successfully"));
});

// Get a coupon by code
export const getCouponByCode = asyncHandler(async (req: Request, res: Response) => {
  const result = await couponService.getCouponByCode(req.params.code);
  if (result) {
    res.send(createResponse(result));
  } else {
    res.status(404).send(createResponse("Coupon not found"));
  }
});

// Get all coupons
export const getAllCoupons = asyncHandler(async (_req: Request, res: Response) => {
  const result = await couponService.getAllCoupons();
  res.send(createResponse(result));
});
