import express from "express";
import accountController from "../controllers/account.controller.js";
import validateAccountData from "../middlewares/account.middleware.js";
const router = express.Router();

router.post("/", accountController.createAccount);
router.get("/", accountController.getAccounts);
router.get("/:id", accountController.getAccountById);
router.put("/:id", validateAccountData, accountController.updateAccountById);
router.delete("/:id", accountController.deleteAccountById);

export default router;
