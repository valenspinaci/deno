import { Router } from "../../depts.ts";
import { findProduct, findProductById, createProduct, deleteProduct, updateProduct } from "../controllers/product.controller.ts";

export const productRouter = new Router()
.get("/products", findProduct)
.get("/products/:id", findProductById)
.put("/products/:id", updateProduct)
.post("/products", createProduct)
.delete("/products/:id", deleteProduct)