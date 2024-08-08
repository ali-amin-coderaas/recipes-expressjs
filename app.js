import cors from "cors";
import express from "express";
import userRouter from "./src/routes/auth.route.js";
import recipesRouter from "./src/routes/recipes.route.js";

const port = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/recipes", recipesRouter);

app.use("/register", userRouter);

app.use("/login", userRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
