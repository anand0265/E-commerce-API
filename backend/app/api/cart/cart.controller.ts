import * as cartService from "./cart.service";
import { createResponse } from "../../common/helper/response.helper";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

export const createCart = asyncHandler(async (req: Request, res: Response) => {
  const result = await cartService.createCart(req.body);
  res.send(createResponse(result, "Cart created successfully"));
});

export const updateCart = asyncHandler(async (req: Request, res: Response) => {
  const result = await cartService.updateCart(
    Number(req.params.id),
    req.body,
  );
  res.send(createResponse(result, "Cart updated successfully"));
});

export const deleteCart = asyncHandler(async (req: Request, res: Response) => {
  const result = await cartService.deleteCart(Number(req.params.id));
  res.send(createResponse(result, "Cart deleted successfully"));
});

export const getCartById = asyncHandler(async (req: Request, res: Response) => {
  const result = await cartService.getCartById(Number(req.params.id));
  res.send(createResponse(result));
});

export const getAllCarts = asyncHandler(async (_req: Request, res: Response) => {
  const result = await cartService.getAllCarts();
  res.send(createResponse(result));
});

