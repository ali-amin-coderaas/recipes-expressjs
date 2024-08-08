import express from "express";
import recipesController from "../controllers/recipes.controller.js";
import testFunction from "../middlewares/test.js";

const router = express.Router();

router.get("/", testFunction, recipesController.getAll);

export default router;
