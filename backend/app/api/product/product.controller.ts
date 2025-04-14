import * as productService from "./product.service";
import { createResponse } from "../../common/helper/response.helper";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";


export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await productService.createProduct(req.body);
    res.send(createResponse(result, "Product created sucssefully"));
  },
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await productService.updateProduct(
      Number(req.params.id),
      req.body,
    );
    res.send(createResponse(result, "Product updated sucssefully"));
  },
);

export const editProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await productService.editProduct(
      Number(req.params.id),
      req.body,
    );
    res.send(createResponse(result, "Product updated sucssefully"));
  },
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await productService.deleteProduct(Number(req.params.id));
    res.send(createResponse(result, "Product deleted sucssefully"));
  },
);

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await productService.getProductById(Number(req.params.id));
    res.send(createResponse(result));
  },
);

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await productService.getAllProducts();
    res.send(createResponse(result));
  },
);