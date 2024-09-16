import express from "express";
import shopController from "../controllers/shop.controller.js";
import validateShopData from "../middlewares/shop.middleware.js";
const router = express.Router();

router.get("/:accountId/shops", shopController.getShops);
router.get("/:accountId/shops/:shopId", shopController.getShop);
router.post("/:accountId/shops", shopController.createShop);
router.put(
	"/:accountId/shops/:shopId",
	validateShopData,
	shopController.updateShopById
);
router.delete("/:accountId/shops/:shopId", shopController.deleteShopById);

export default router;
