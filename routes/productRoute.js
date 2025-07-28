import express from "express";
import { deleteProduct, getProductById, getProducts, saveProduct, searchProducts, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", saveProduct);
productRouter.delete("/:productId", deleteProduct);
productRouter.put("/:productId", updateProduct);
productRouter.get("/:productId", getProductById);
productRouter.get("/search/:query", searchProducts);


export default productRouter;

