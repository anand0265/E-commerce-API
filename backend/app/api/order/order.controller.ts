import * as orderService from "./order.service";
import { createResponse } from "../../common/helper/response.helper";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

// Create Order
export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const result = await orderService.createOrder(req.body);
  res.send(createResponse(result, "Order created successfully"));
});

// Update Order (PUT)
export const updateOrder = asyncHandler(async (req: Request, res: Response) => {
  const result = await orderService.updateOrder(Number(req.params.id), req.body);
  res.send(createResponse(result, "Order updated successfully"));
});

// Edit Order (PATCH)
export const editOrder = asyncHandler(async (req: Request, res: Response) => {
  const result = await orderService.editOrder(Number(req.params.id), req.body);
  res.send(createResponse(result, "Order edited successfully"));
});

// Delete Order
export const deleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const result = await orderService.deleteOrder(Number(req.params.id));
  res.send(createResponse(result, "Order deleted successfully"));
});

// Get Order by ID
export const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const result = await orderService.getOrderById(Number(req.params.id));
  res.send(createResponse(result));
});

// Get All Orders
export const getAllOrders = asyncHandler(async (_req: Request, res: Response) => {
  const result = await orderService.getAllOrders();
  res.send(createResponse(result));
});
