import express from "express";

const router = express.Router();

//list of routes

router.get("/test", (req, res) => {
  res.send("Router working");
});

export default router;
