import * as logService from "../services/LogServices.js";

export const logs = async (req, res) => {
  try {
    const studenLogs = await logService.logs();
    res.status(200).json(studenLogs);
  } catch (error) {
    console.error("Error While Getting Log List:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logIn = async (req, res) => {
  try {
    const loggedIn = await logService.logIn(req.body);
    res.status(200).json({ success: "Student logged In" });
  } catch (error) {
    console.error("Error Logging Student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logOut = async (req, res) => {
  try {
    const loggedIn = await logService.logOut(req.params);
    res.status(200).json({ success: "Student Logged Out" });
  } catch (error) {
    console.error("Error Logging Out Student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
