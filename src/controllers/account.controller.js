import { handleError, handleSuccess } from "../utils/responseHelper.js";
import AccountService from "./../services/account.service.js";

const getAll = async (req, res) => {
	const searchQuery = req.query.q || "";
	const page = Number(req.query.page) || 1;
	const pageSize = Number(req.query.pageSize) || 10;
	const sortBy = req.query.sortBy || "createdAt";
	const order = req.query.order || "ASC";

	try {
		const data = await AccountService.getAllAccounts(
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

		return handleSuccess(
			res,
			200,
			{ items },
			req,
			pagination,
			null,
			"Fetch Accounts"
		);
	} catch (error) {
		return handleError(res, 500, error, req, "Fetch Accounts");
	}
};

const getById = async (req, res) => {
	const { accountId } = req.params;

	try {
		const account = await AccountService.getAccountById(accountId);

		if (!account) {
			return handleError(
				res,
				404,
				{ message: "Account not found" },
				req,
				"Fetch Account"
			);
		}
		return handleSuccess(res, 200, account, req, null, null, "Fetch Account");
	} catch (error) {
		return handleError(res, 500, error, req, "Fetch Account");
	}
};
const create = async (req, res) => {
	const { name, type } = req.body;
	try {
		const newAccountId = await AccountService.createAccount({ name, type });
		return handleSuccess(
			res,
			201,
			{ accountId: newAccountId },
			req,
			null,
			null,
			"Create Account"
		);
	} catch (error) {
		return handleError(res, 500, error, req, "Create Account");
	}
};

const update = async (req, res) => {
	const { accountId } = req.params;
	const fieldsToUpdate = req.body;

	try {
		const result = await AccountService.updateAccount(
			Number(accountId),
			fieldsToUpdate
		);
		if (result.affectedRows === 0) {
			return res.status(404).json({ error: "Account not found" });
		}
		return handleSuccess(res, 200, req.body, req, null, null, "Update Account");
	} catch (error) {
		return handleError(res, 500, error, req, "Update Account");
	}
};

const destroy = async (req, res) => {
	const { accountId } = req.params;
	try {
		const result = await AccountService.deleteAccount(accountId);
		if (result.affectedRows === 0) {
			return handleError(res, 404, "Account not found", req, "Delete Account");
		}
		return handleSuccess(
			res,
			200,
			{ message: "Account deleted successfully" },
			req,
			null,
			null,
			"Delete Account"
		);
	} catch (error) {
		return handleError(res, 500, error, req, "Delete Account");
	}
};

const fetchAccountsByType = async (req, res) => {
	try {
		const data = await getAccountsByType();
		return handleSuccess(res, 200, data, req, null, null, "Accounts By Type");
	} catch (error) {
		return handleError(res, 500, error, req, "Accounts By Type");
	}
};
export default {
	fetchAccountsByType,
	create,
	getAll,
	getById,
	update,
	destroy,
};
