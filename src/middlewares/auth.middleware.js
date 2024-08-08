import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];

	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) return res.status(401);

	jwt.verify(token, secret, (err, user) => {
		if (err) return res.status(403);
		req.user = user;
		next();
	});
};

export default { authenticateToken };
