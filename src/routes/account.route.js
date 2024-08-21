import express from "express";
import accountController from "../controllers/account.controller.js";
import validateAccountData from "../middlewares/account.middleware.js";
const router = express.Router();

router.post("/accounts", accountController.createAccount);
router.get("/accounts", accountController.getAccounts);
router.get("/accounts/:id", accountController.getAccountById);
router.put(
	"/accounts/:id",
	validateAccountData,
	accountController.updateAccountById
);
router.delete("/accounts/:id", accountController.deleteAccountById);

export default router;
