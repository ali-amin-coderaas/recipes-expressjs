import express from "express";
import recipesController from "../controllers/recipes.controller.js";

const router = express.Router();

router.get("/", recipesController.getAll);

export default router;
