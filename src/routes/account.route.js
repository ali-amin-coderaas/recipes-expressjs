import express from "express";
import accountController from "../controllers/account.controller.js";
import accountValidator from "../middlewares/Account/account.middleware.js";
const router = express.Router();

router.get(
	"/",
	accountValidator.validateAccountQuery,
	accountController.getAll
);
router.post(
	"/",
	accountValidator.validateCreateAccount,
	accountController.create
);
router.get(
	"/:accountId",
	accountValidator.validateAccountId,
	accountController.getById
);
router.put(
	"/:accountId",
	accountValidator.validateUpdateAccount,
	accountController.update
);
router.delete(
	"/:accountId",
	accountValidator.validateAccountId,
	accountController.destroy
);

export default router;
