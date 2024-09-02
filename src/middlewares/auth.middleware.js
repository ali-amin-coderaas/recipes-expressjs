import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secret = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["Authorization"];

	const token = authHeader && authHeader.split(" ")[1];
	console.log("🚀 ~ authenticateToken ~ token:", token);

	if (!token) return res.sendStatus(401);

	jwt.verify(token, secret, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;

		next();
	});
};

export default authenticateToken;
