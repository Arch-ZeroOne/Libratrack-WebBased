import express from "express";
import cors from "cors";

import authRouter from "./routes/AuthRoute.js";
const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());

//creates the base route
app.use("/api", authRouter);

app.listen(port, () => {
  console.log("Server running in port", port);
});
