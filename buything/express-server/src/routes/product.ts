import {
  getCategories,
  getProduct,
  getProducts,
  getProductsByCategory,
} from "@/controllers/product";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/detail/:id", getProduct);
productRouter.get("/categories", getCategories);
productRouter.get("/products", getProducts);
productRouter.get("/products/:category", getProductsByCategory);

export default productRouter;
