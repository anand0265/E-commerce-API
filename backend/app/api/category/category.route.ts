import { Router } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import * as categoryController from "./category.controller";
import * as categoryValidator from "./category.validation";
import { upload } from "../../common/middleware/multer.middleware";

const router = Router();

router
  .get("/", categoryController.getAllCategory)
  .get("/:id", categoryController.getCategoryById)
  .delete("/:id", categoryController.deleteCategory)
  .post(
    "/",
    upload.none(),
    categoryValidator.createCategory,
    catchError,
    categoryController.createCategory
  )
  .put(
    "/:id",
    upload.none(),
    categoryValidator.updateCategory,
    catchError,
    categoryController.updateCategory
  )
  .patch(
    "/:id",
    upload.none(),
    categoryValidator.editCategory,
    catchError,
    categoryController.editCategory
  );

export default router;
