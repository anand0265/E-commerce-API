import express from "express"
import userRoutes from './api/user/user.route'
import categoryRoute from './api/category/category.route'
import producrRoute from "./api/product/product.route"


const router = express.Router();

router.use("/users",userRoutes);
router.use('/category',categoryRoute);
router.use("/products",producrRoute)

export default router;