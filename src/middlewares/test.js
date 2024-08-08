const testFunction = async (req, res, next) => {
	console.log("body:", req.body);

	next();
};

export default testFunction;
