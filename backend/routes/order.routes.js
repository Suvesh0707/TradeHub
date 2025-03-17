import express from "express";
import { placeOrder, getUserOrders, updateOrderStatus, getAllOrders,getSellerOrders } from "../controllers/order.controller.js";
import protectRoute from "../middlewares/protect.route.js";

const router = express.Router();

router.post('/place-order', protectRoute, placeOrder);
router.get("/getuserorders", protectRoute, getUserOrders);
router.put("/update-order-status", protectRoute, updateOrderStatus);
router.get("/getallorders", protectRoute, getAllOrders);
router.get("/getsellerorders", protectRoute, getSellerOrders);

export default router;
