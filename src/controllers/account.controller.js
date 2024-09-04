import {
	addAccount,
	deleteAccount,
	getAccountsByType,
	getAllAccounts,
	getById,
	updateAccount,
} from "../services/account.service.js";

import { handleError, handleSuccess } from "../utils/responseHelper.js";

const createAccount = async (req, res) => {
	const { name } = req.body;
	try {
		const newAccountId = await addAccount(name);
		handleSuccess(
			res,
			201,
			{ id: newAccountId },
			req,
			null,
			null,
			"Create Account"
		);
	} catch (error) {
		handleError(res, 500, error, req, "Create Account");
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

		handleSuccess(res, 200, { items }, req, pagination, null, "Fetch Accounts");
	} catch (error) {
		handleError(res, 500, error, req, "Fetch Accounts");
	}
};

const getAccountById = async (req, res) => {
	const { id } = req.params;
	try {
		const account = await getById(id);

		if (!account) {
			handleError(res, 404, "Account not found", req, "Fetch Account");
		}
		handleSuccess(res, 200, account, req, null, null, "Fetch Account");
	} catch (error) {
		handleError(res, 500, error, req, "Fetch Account");
	}
};

const updateAccountById = async (req, res) => {
	const { id } = req.params;
	const fieldsToUpdate = req.body;

	try {
		const result = await updateAccount(Number(id), fieldsToUpdate);
		if (result.affectedRows === 0) {
			return res.status(404).json({ error: "Account not found" });
		}
		handleSuccess(res, 200, req.body, req, null, null, "Update Account");
	} catch (error) {
		handleError(res, 500, error, req, "Update Account");
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
			"Delete Account"
		);
	} catch (error) {
		handleError(res, 500, error, req, "Delete Account");
	}
};

const fetchAccountsByType = async (req, res) => {
	try {
		const data = await getAccountsByType();
		handleSuccess(res, 200, data, req, null, null, "Accounts By Type");
	} catch (error) {
		handleError(res, 500, error, req, "Accounts By Type");
	}
};
export default {
	fetchAccountsByType,
	createAccount,
	getAccountById,
	getAccounts,
	deleteAccountById,
	updateAccountById,
};
