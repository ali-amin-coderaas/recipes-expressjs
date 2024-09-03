import express from "express";
import accountController from "../controllers/account.controller.js";
import shopController from "../controllers/shop.controller.js";
const router = express.Router();

router.get("/accounts/type", accountController.fetchAccountsByType);

router.get("/shops/industry", shopController.fetchShopsByIndustry);

export default router;
