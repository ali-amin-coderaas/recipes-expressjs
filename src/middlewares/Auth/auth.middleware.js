import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secret = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];

	const token = authHeader && authHeader.split(" ")[1];

	if (!token) return res.sendStatus(401);

	jwt.verify(token, secret, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;

		next();
	});
};

export default authenticateToken;
