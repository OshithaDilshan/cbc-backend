import express from "express";
import { createOrder } from "../controllers/orderController.js";
const ordeRouter = express.Router();

ordeRouter.post("/", createOrder)

export default ordeRouter;