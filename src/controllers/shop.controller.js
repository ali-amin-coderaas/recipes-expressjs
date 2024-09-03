import {
	addShop,
	deleteShop,
	getAllShops,
	getById,
	getShopsByIndustry,
	updateShop,
} from "../services/shop.service.js";
import { handleError, handleSuccess } from "../utils/responseHelper.js";

const getShops = async (req, res) => {
	let { accountId } = req.params;
	let {
		page = 1,
		pageSize = 5,
		q: searchQuery,
		sortBy = "createdAt",
		order = "DESC",
	} = req.query;

	// Ensure valid integers for page and pageSize
	const currPage = parseInt(page, 10);
	const size = parseInt(pageSize, 10);
	const accId = parseInt(accountId, 10);

	try {
		// Call the getAllShops function with the necessary parameters
		const data = await getAllShops(
			accId,
			currPage,
			size,
			searchQuery,
			sortBy,
			order
		);

		const { items, totalItems, currentPage, totalPages } = data;
		const pagination = {
			currentPage,
			pageSize: size,
			totalItems,
			totalPages,
		};
		const links = {
			self: `${req.baseUrl}${req.path}?page=${currentPage}&pageSize=${pageSize}`,
			next:
				currentPage < totalPages
					? `${req.baseUrl}${req.path}?page=${
							currentPage + 1
					  }&pageSize=${pageSize}`
					: null,
			previous:
				currentPage > 1
					? `${req.baseUrl}${req.path}?page=${
							currentPage - 1
					  }&pageSize=${pageSize}`
					: null,
		};

		// Send a successful response with the data, pagination, and links
		handleSuccess(res, 200, { items }, req, pagination, links, "Fetch shops");
	} catch (error) {
		// Handle any errors that occur during the process
		handleError(res, 500, error, req, "Fetch shops");
	}
};

const createShop = async (req, res) => {
	const { accountId } = req.params;
	const { name, businessName, email } = req.body;

	try {
		const newShopId = await addShop(accountId, name, businessName, email);
		handleSuccess(res, 201, { id: newShopId }, req, null, null, "Create shop");
	} catch (error) {
		handleError(res, 500, error, req, "Create shop");
	}
};
const getShop = async (req, res) => {
	const { accountId, shopId } = req.params;
	try {
		const shop = await getById(shopId, accountId);
		if (!shop) {
			handleError(res, 404, "Shop not found", req, "Fetch Shop");
		}
		handleSuccess(res, 200, shop, req, null, null, "Fetch Shop");
	} catch (error) {
		handleError(res, 500, error, req, "Fetch Shop");
	}
};

const updateShopById = async (req, res) => {
	const { shopId, accountId } = req.params;
	const fieldsToUpdate = req.body;

	try {
		if (!fieldsToUpdate || Object.keys(fieldsToUpdate).length === 0) {
			return res.status(400).json({ error: "No fields provided for update." });
		}

		const updatedShop = await updateShop(shopId, accountId, fieldsToUpdate);

		if (!updatedShop) {
			handleError(res, 404, "Shop not found", req, "Update Shop");
		}

		handleSuccess(res, 200, updatedShop, req, null, null, "Update Shop");
	} catch (error) {
		handleError(res, 500, error, req, "Update Shop");
	}
};

const deleteShopById = async (req, res) => {
	const { accountId, shopId } = req.params;
	try {
		const result = await deleteShop(shopId, accountId);
		if (result.affectedRows === 0) {
			handleError(res, 404, "Shop not found", req, "Delete Shop");
		}
		handleSuccess(
			res,
			200,
			{ message: "Shop deleted successfully" },
			req,
			null,
			null,
			"Delete Shop"
		);
	} catch (error) {
		handleError(res, 500, error, req, "Delete Shop");
	}
};

const fetchShopsByIndustry = async (req, res) => {
	try {
		const shopsByIndustry = await getShopsByIndustry();
		handleSuccess(
			res,
			200,
			shopsByIndustry,
			req,
			null,
			null,
			"Shops  by industry"
		);
	} catch (error) {
		handleError(res, 500, error, req, "Shops  by industry");
	}
};

export default {
	fetchShopsByIndustry,
	getShops,
	updateShopById,
	createShop,
	getShop,
	deleteShopById,
};
