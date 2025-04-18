

import { Router } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import * as couponController from "./coupon.controller";
import * as couponValidator from "./coupon.validation";
import { upload } from "../../common/middleware/multer.middleware";

const router = Router();

router
  .get("/", couponController.getAllCoupons)
  .get("/code/:code", couponController.getCouponByCode)
  .delete("/:id", couponController.deleteCoupon)
  .post(
    "/",
    upload.none(),
    couponValidator.createCoupon,
    catchError,
    couponController.createCoupon
  )
  .put(
    "/:id",
    upload.none(),
    couponValidator.updateCoupon,
    catchError,
    couponController.updateCoupon
  )
  .patch(
    "/:id",
    upload.none(),
    couponValidator.editCoupon,
    catchError,
    couponController.updateCoupon 
  );

export default router;
