import express from "express";
import accountController from "../controllers/account.controller.js";
const router = express.Router();

router.get("/accounts/count", accountController.CountAccountsByMonth);
