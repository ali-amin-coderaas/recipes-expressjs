import {
	addAccount,
	deleteAccount,
	getAllAccounts,
	getById,
	updateAccount,
} from "../services/account.service.js";

import { handleError, handleSuccess } from "../utils/responseHelper.js";

const entityName = "Accounts";

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
	let { page, pageSize } = req.query;

	if (!pageSize) {
		pageSize = 5;
	}
	if (!page) {
		page = 1;
	}

	const currPage = parseInt(page, 10);
	const size = parseInt(pageSize, 10);

	try {
		const data = await getAllAccounts(currPage, size);

		const { items, totalItems, currentPage, totalPages } = data;
		const pagination = {
			currentPage,
			pageSize: size,
			totalItems,
			totalPages,
		};
		const links = {
			self: `${req.baseUrl}${req.path}?page=${Number(
				currentPage
			)}&pageSize=${pageSize}`,
			next:
				currentPage < totalPages
					? `${req.baseUrl}${req.path}?page=${
							Number(currentPage) + 1
					  }&pageSize=${pageSize}`
					: null,
			previous:
				currentPage > 1
					? `${req.baseUrl}${req.path}?page=${
							Number(currentPage) - 1
					  }&pageSize=${pageSize}`
					: null,
		};

		handleSuccess(res, 200, { items }, req, pagination, links, entityName);
	} catch (error) {
		handleError(res, 500, error, req);
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
