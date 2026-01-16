import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import StudentRoutes from "./routes/StudentRoutes.js";
import AccountRoutes from "./routes/AccountRoutes.js";
import LogsRoutes from "./routes/LogsRoute.js";
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

//The base of routes

app.use("/api", StudentRoutes);
app.use("/api", AccountRoutes);
app.use("/api", LogsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
