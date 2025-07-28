import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import quoteRouter from "./routes/quoteRoutes.js";
import clientRouter from "./routes/clientRoutes.js";
import qouteSearchRouter from "./routes/quoteRoutesSearch.js";

import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const frontendURL = process.env.FRONTEND_URL;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: frontendURL,
    credentials: true,
  })
);

//API Endpoints
app.get("/", (req, res) => {
  res.send("API Working Correctly");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/quotes", quoteRouter);
app.use("/api/clients", clientRouter);
app.use("/api/quoteSearch", qouteSearchRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));
