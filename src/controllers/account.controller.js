import {
	addAccount,
	deleteAccount,
	getAllAccounts,
	getById,
	updateAccount,
} from "../services/account.service.js";

const createAccount = async (req, res) => {
	const { name } = req.body;
	try {
		const newAccountId = await addAccount(name);
		return res.status(201).json({ id: newAccountId });
	} catch (error) {
		res
			.status(500)
			.json({ error: "An error occurred while creating the account" });
		console.error(error);
	}
};

const getAccounts = async (req, res) => {
	try {
		const accounts = await getAllAccounts();
		return res.status(200).json(accounts);
	} catch (error) {
		res
			.status(500)
			.json({ error: "An error occurred while fetching accounts" });
		console.error(error);
	}
};

const getAccountById = async (req, res) => {
	const { id } = req.params;
	try {
		const account = await getById(id);

		if (!account) {
			return res.status(404).json({ error: "Account not found" });
		}
		return res.status(200).json(account);
	} catch (error) {
		res
			.status(500)
			.json({ error: "An error occurred while retrieving account data" });
		console.error(error);
	}
};

const updateAccountById = async (req, res) => {
	const { id } = req.params;
	const fieldsToUpdate = req.body;

	try {
		const result = await updateAccount(id, fieldsToUpdate);
		if (result.affectedRows === 0) {
			return res.status(404).json({ error: "Account not found" });
		}
		return res.status(200).json({ message: "Account updated successfully" });
	} catch (error) {
		res.status(500).json({ error: "An error occurred while updating account" });
		console.error(error);
	}
};

const deleteAccountById = async (req, res) => {
	const { id } = req.params;
	const isActive = false;
	try {
		const result = await deleteAccount(id, isActive);
		if (result.affectedRows === 0) {
			return res.status(404).json({ error: "Account not found" });
		}
		return res.status(200).json({ message: "Account delted successfully" });
	} catch (error) {
		res.status(500).json({ error: "An error occurred while deleting account" });
		console.error(error);
	}
};

export default {
	createAccount,
	getAccountById,
	getAccounts,
	deleteAccountById,
	updateAccountById,
};
