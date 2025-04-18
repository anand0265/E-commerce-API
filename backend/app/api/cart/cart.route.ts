import { Router } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import * as cartController from "./cart.controller";
import * as cartValidator from "./cart.validation";
import { upload } from "../../common/middleware/multer.middleware";

const router = Router();

router
  .get("/", cartController.getAllCarts)
  .get("/:id", cartController.getCartById)
  .delete("/:id", cartController.deleteCart)
  .post(
    "/",
    upload.none(),
    cartValidator.createCart,
    catchError,
    cartController.createCart
  )
  .put(
    "/:id",
    upload.none(),
    cartValidator.updateCart,
    catchError,
    cartController.updateCart
  )
  .patch(
    "/:id",
    upload.none(),
    cartValidator.editCart,
    catchError,
    cartController.updateCart // You can also separate if needed
  );

export default router;
