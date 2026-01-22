import { Router } from "express";
import {
  deleteProduct,
  deleteProductImage,
  getLatestProducts,
  getListings,
  getProductDetail,
  getProductsByCategory,
  listNewProduct,
  searchProducts,
  updateProduct,
} from "../controllers/product";
import { isAuth } from "../middleware/auth";
import fileParser from "../middleware/fileParser";
import validate from "../middleware/validator";
import { newProductSchema } from "../utils/validationSchema";

const productRouter = Router();

productRouter.post(
  "/list",
  isAuth,
  fileParser,
  validate(newProductSchema),
  listNewProduct
);

productRouter.patch(
  "/:id",
  isAuth,
  fileParser,
  validate(newProductSchema),
  updateProduct
);
productRouter.delete("/:id", isAuth, deleteProduct);
productRouter.delete("/image/:productId/:imageId", isAuth, deleteProductImage);
productRouter.get("/detail/:id", getProductDetail);
productRouter.get("/by-category/:category", getProductsByCategory);
productRouter.get("/latest", getLatestProducts);
productRouter.get("/listings", isAuth, getListings);
productRouter.get("/search", isAuth, searchProducts);

export default productRouter;
