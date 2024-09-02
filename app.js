import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authenticateToken from "./src/middlewares/auth.middleware.js";
import accountRouter from "./src/routes/account.route.js";
import userRouter from "./src/routes/auth.route.js";
import recipesRouter from "./src/routes/recipes.route.js";
import shopRouter from "./src/routes/shop.route.js";

dotenv.config();

const port = 8080;
const app = express();

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use(express.json());
app.use(cors());

app.use("/", recipesRouter);

app.use("/", userRouter);

app.use("/", accountRouter);

app.use("/", authenticateToken, shopRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
