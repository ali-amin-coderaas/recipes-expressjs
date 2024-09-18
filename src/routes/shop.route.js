import express from "express";
import shopController from "../controllers/shop.controller.js";
import shopValidator from "../middlewares/Shop/shop.middleware.js";
const router = express.Router();

router.get(
	"/:accountId/shops",
	shopValidator.validateShopQuery,
	shopController.getShops
);
router.get(
	"/:accountId/shops/:shopId",
	shopValidator.validateShopId,
	shopController.getShop
);
router.post(
	"/:accountId/shops",
	shopValidator.validateCreateShop,
	shopController.createShop
);
router.put(
	"/:accountId/shops/:shopId",
	shopValidator.validateUpdateShop,
	shopController.updateShopById
);
router.delete(
	"/:accountId/shops/:shopId",
	shopValidator.validateShopId,
	shopController.deleteShopById
);

export default router;
