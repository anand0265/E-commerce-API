import { Router } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import * as orderController from "./order.controller";
import * as orderValidator from "./order.validation"; 

const router = Router();

router
  .get("/", orderController.getAllOrders)
  .get("/:id", orderController.getOrderById)
  .delete("/:id", orderController.deleteOrder)

  .post(
    "/",
    orderValidator.createOrder, 
    catchError,
    orderController.createOrder
  )

  .put(
    "/:id",
    orderValidator.updateOrder, 
    catchError,
    orderController.updateOrder
  )

  .patch(
    "/:id",
    orderValidator.editOrder, 
    catchError,
    orderController.editOrder
  );

export default router;
