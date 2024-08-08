import express from "express";
import authConroller from "../controllers/auth.controller.js";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", userController.register);

router.post("/login", authConroller.login);

export default router;
