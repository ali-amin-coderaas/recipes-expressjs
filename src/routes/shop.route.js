import express from "express";
import shopController from "../controllers/shop.controller.js";
import validateShopData from "../middlewares/shop.middleware.js";
const router = express.Router();

router.post("/accounts/:accountId/shops", shopController.createShop);
router.get("/accounts/:accountId/shops", shopController.getShops);
router.get("/accounts/:accountId/shops/:shopId", shopController.getShop);
router.put(
	"/accounts/:accountId/shops/:shopId",
	validateShopData,
	shopController.updateShopById
);
router.delete(
	"/accounts/:accountId/shops/:shopId",
	shopController.deleteShopById
);

export default router;
