import express from "express";
import { addToCart, deleteProductFromCart   , getCartInfo} from "../controllers/cart.controller.js";
import protectRoute from "../middlewares/protect.route.js";

const router = express.Router();

router.post("/addtocart", protectRoute, addToCart);
router.get('/getcartinfo', protectRoute, getCartInfo);
router.delete('/deletecartinfo', protectRoute, deleteProductFromCart);

export default router;
