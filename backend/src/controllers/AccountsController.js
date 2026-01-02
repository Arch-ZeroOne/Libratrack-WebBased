import * as accountService from "../services/AccountServices.js";

export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await accountService.getAllAccounts();
    res.status(200).json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const insertAccount = async (req, res) => {
  try {
    const registeredAccount = await accountService.registerAccount(req.body);
    res.status(201).json(registeredAccount);
  } catch (error) {
    console.error(("Error registering account", error));
    res.status(500).json({ error: "Internal Server Error" });
  }
};
