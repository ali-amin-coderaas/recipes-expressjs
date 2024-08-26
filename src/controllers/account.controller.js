import {
	addAccount,
	deleteAccount,
	getAllAccounts,
	getById,
	updateAccount,
} from "../services/account.service.js";

import formatResponse from "../utils/responseHelper.js";

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
	const pageSize = req.query.pageSize;
	const page = req.query.page;
	try {
		const accountsData = await getAllAccounts(page, pageSize);
		// Format response for success
		const response = formatResponse(
			200, // HTTP status code
			accountsData, // Data to include in the response
			null, // No error
			req.originalUrl, // Request path
			req.method // Request method
		);

		// Send the formatted response
		res.status(200).json(response);
	} catch (error) {
		// Format response for error
		const response = formatResponse(
			500, // HTTP status code (e.g., internal server error)
			null, // No data
			{ message: error.message }, // Error information
			req.originalUrl, // Request path
			req.method // Request method
		);

		// Send the formatted error response
		res.status(500).json(response);
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
	try {
		const result = await deleteAccount(id);
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
