import express from "express";
import * as accountController from "../controllers/AccountsController.js";

const router = express.Router();

router.get("/accounts", accountController.getAllAccounts);
router.post("/accounts", accountController.insertAccount);

export default router;
