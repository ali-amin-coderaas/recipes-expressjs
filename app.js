import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authenticateToken from "./src/middlewares/Auth/auth.middleware.js";
import "./src/models/index.js";
import accountRouter from "./src/routes/account.route.js";
import userRouter from "./src/routes/auth.route.js";
import shopRouter from "./src/routes/shop.route.js";
import statsRouter from "./src/routes/stats.route.js";

dotenv.config();

const port = 8080;
const app = express();

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

app.use("/accounts", accountRouter);

app.use("/accounts", authenticateToken, shopRouter);

app.use("/analytics", authenticateToken, statsRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
