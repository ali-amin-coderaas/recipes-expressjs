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
		handleSuccess(res, 201, { id: newAccountId }, req, null, null, entityName);
	} catch (error) {
		handleError(res, 500, error, req, entityName);
	}
};

const getAccounts = async (req, res) => {
	const searchQuery = req.query.q || "";
	const page = Number(req.query.page) || 1;
	const pageSize = Number(req.query.pageSize) || 0;
	const sortBy = req.query.sortBy || "";
	const order = req.query.order || "";

	try {
		const data = await getAllAccounts(
			page,
			pageSize,
			searchQuery,
			sortBy,
			order
		);

		const { items, totalItems, currentPage, totalPages } = data;
		const pagination = {
			currentPage,
			pageSize: data.pageSize,
			totalItems,
			totalPages,
		};

		handleSuccess(res, 200, { items }, req, pagination, null, entityName);
	} catch (error) {
		handleError(res, 500, error, req, entityName);
	}
};

const getAccountById = async (req, res) => {
	const { id } = req.params;
	try {
		const account = await getById(id);

		if (!account) {
			handleError(res, 404, "Account not found", req, entityName);
		}
		handleSuccess(res, 200, account, req, null, null, entityName);
	} catch (error) {
		handleError(res, 500, error, req, entityName);
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
		handleSuccess(
			res,
			200,
			{ message: "Account updated successfully" },
			req,
			null,
			null,
			entityName
		);
	} catch (error) {
		handleError(res, 500, error, req, entityName);
	}
};

const deleteAccountById = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await deleteAccount(id);
		if (result.affectedRows === 0) {
			return res.status(404).json({ error: "Account not found" });
		}
		handleSuccess(
			res,
			200,
			{ message: "Account deleted successfully" },
			req,
			null,
			null,
			entityName
		);
	} catch (error) {
		handleError(res, 500, error, req, entityName);
	}
};

export default {
	createAccount,
	getAccountById,
	getAccounts,
	deleteAccountById,
	updateAccountById,
};
