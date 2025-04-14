import { Router } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import * as productController from "./product.controller"
import * as productValidator from "./product.validation"
import { upload } from "../../common/middleware/multer.middleware";

const router = Router();

// router
//   .get("/", productController.getAllProducts)
//   .get("/:id", productController.getProductById)
//   .delete("/:id",productController.deleteProduct)
//   .post(
//     "/",
//      upload.single("images"),
//    productValidator.createProduct,
//     catchError,
//     productController.createProduct
//   )
//   .put(
//     "/:id",
//      upload.single("images"),
    
//     productValidator.updateProduct,
//     catchError,
//    productController.updateProduct
//   )
//   .patch(
//     "/:id",
//     upload.none(),
//    productValidator.editProduct,
//     catchError,
//     productController.editProduct
//   );



router
  .get("/", productController.getAllProducts)
  .get("/:id", productController.getProductById)
  .delete("/:id", productController.deleteProduct)

  .post(
    "/",
    upload.array("images", 5), // assuming multiple images
    productValidator.createProduct,
    catchError,
    productController.createProduct
  )

  .put(
    "/:id",
    upload.array("images", 5),
    productValidator.updateProduct,
    catchError,
    productController.updateProduct
  )

  .patch(
    "/:id",
    upload.array("images", 5), // change from upload.none() if PATCH includes image edits
    productValidator.editProduct,
    catchError,
    productController.editProduct
  );

  export default router;