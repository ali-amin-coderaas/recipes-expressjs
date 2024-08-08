import express from "express";
import authConroller from "../controllers/auth.controller.js";
import userController from "../controllers/user.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/regsiter", userController.register);

router.post("/login", authenticateToken, authConroller.login);

export default router;
