import express from "express";
import recipesController from "../controllers/recipes.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, recipesController.getAll);

export default router;
