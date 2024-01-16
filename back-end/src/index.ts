const express = require("express");

import authRoutes = require("./routes/auth");

import storyRoutes = require("./routes/story");
import cors = require("cors");

import { Request, Response } from "express";
import { verifyToken } from "./middleware/verifyToken";
import { logMiddlewareRequest } from "./middleware/logs";

require("dotenv").config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(logMiddlewareRequest);
app.use("/assets", express.static("public/images"));

app.use("/auth", authRoutes);
app.use("/story", verifyToken, storyRoutes);


app.use((req: Request, res: Response, err: any) => {
  res.status(500).json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;