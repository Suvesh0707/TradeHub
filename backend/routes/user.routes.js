import express from "express";
import { loginUser, logoutUser, registerUser, checkAuth } from "../controllers/user.controller.js";
import protectRoute from "../middlewares/protect.route.js";
const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.get("/checkauth",protectRoute,checkAuth)

export default router