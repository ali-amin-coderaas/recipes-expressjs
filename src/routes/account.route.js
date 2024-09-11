import express from "express";
import accountController from "../controllers/account.controller.js";
import validateAccountData from "../middlewares/account.middleware.js";
const router = express.Router();

router.post("/", accountController.createAccount);
router.get("/", accountController.getAccounts);
router.get("/:accountId", accountController.getAccountById);
router.put(
	"/:accountId",
	validateAccountData,
	accountController.updateAccountById
);
router.patch("/:accountId", accountController.deleteAccountById);

export default router;
