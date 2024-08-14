import { addAccount } from "../services/account.service";

export const createAccount = async (req, res) => {
	const { name, isActive } = req.body;
	try {
		const newAccountID = await addAccount(
			name,
			isActive,
			new Date(),
			new Date()
		);
		return res.status(201).json({ id: newAccountID });
	} catch (error) {
		res
			.status(500)
			.json({ error: "An error occurred while creating the account" });
		console.error(error);
	}
};
