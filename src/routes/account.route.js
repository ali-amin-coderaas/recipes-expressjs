import express from "express";
import accountController from "../controllers/account.controller.js";
import accountValidator from "../middlewares/account.middleware.js";
const router = express.Router();

router.get(
	"/",
	accountValidator.validateAccountQuery,
	accountController.getAccounts
);
router.get(
	"/:accountId",
	accountValidator.validateAccountId,
	accountController.getAccountById
);
router.post(
	"/",
	accountValidator.validateCreateAccount,
	accountController.createAccount
);
router.put(
	"/:accountId",
	accountValidator.validateUpdateAccount,
	accountController.updateAccountById
);
router.delete(
	"/:accountId",
	accountValidator.validateDeleteAccount,
	accountController.deleteAccountById
);

export default router;
