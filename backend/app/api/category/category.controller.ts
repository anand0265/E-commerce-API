import * as categoryService from "./category.service";
import { createResponse } from "../../common/helper/response.helper";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await categoryService.createCategory(req.body);
    res.send(createResponse(result, "Category created sucssefully"));
  },
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await categoryService.updateCategory(
      Number(req.params.id),
      req.body,
    );
    res.send(createResponse(result, "Category updated sucssefully"));
  },
);

export const editCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await categoryService.editCategory(
      Number(req.params.id),
      req.body,
    );
    res.send(createResponse(result, "Category updated sucssefully"));
  },
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await categoryService.deleteCategory(Number(req.params.id));
    res.send(createResponse(result, "Category deleted sucssefully"));
  },
);

export const getCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await categoryService.getCategoryById(Number(req.params.id));
    res.send(createResponse(result));
  },
);

export const getAllCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await categoryService.getAllCategory();
    res.send(createResponse(result));
  },
);
