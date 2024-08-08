import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import userRouter from "./src/routes/auth.route.js";
import recipesRouter from "./src/routes/recipes.route.js";

dotenv.config();

const port = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", recipesRouter);

app.use("/", userRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
