import {
	addShop,
	deleteShop,
	getAllShops,
	getById,
	updateShop,
} from "../services/shop.service.js";
import { handleError, handleSuccess } from "../utils/responseHelper.js";

const entityName = "Shops";

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
		handleSuccess(res, 200, { items }, req, pagination, links, entityName);
	} catch (error) {
		// Handle any errors that occur during the process
		handleError(res, 500, error, req, entityName);
	}
};

const createShop = async (req, res) => {
	const { accountId } = req.params;
	const { name, businessName, email } = req.body;

	try {
		const newShopId = await addShop(accountId, name, businessName, email);
		return res.status(201).json({ shopId: newShopId });
	} catch (error) {
		res
			.status(500)
			.json({ error: "An error occurred while creating the shop" });
		console.error(error);
	}
};
const getShop = async (req, res) => {
	const { accountId, shopId } = req.params;
	try {
		const shop = await getById(shopId, accountId);
		if (!shop) {
			return res.status(404).json({ error: "Shop not found" });
		}
		return res.status(200).json(shop);
	} catch (error) {
		res
			.status(500)
			.json({ error: "An error occurred while fetching the shop" });
		console.error(error);
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
			return res.status(404).json({ error: "Shop not found" });
		}

		return res.status(200).json({ message: "Shop updated successfully" });
	} catch (error) {
		res
			.status(500)
			.json({ error: "An error occurred while updating the shop" });
		console.error(error);
	}
};

const deleteShopById = async (req, res) => {
	const { accountId, shopId } = req.params;
	try {
		const result = await deleteShop(shopId, accountId);
		if (result.affectedRows === 0) {
			return res.status(404).json({ error: "Shop not found" });
		}
		return res.status(200).json({ error: "Shop deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: "An error occurred while deleting shop" });
		console.error(error);
	}
};

export default {
	getShops,
	updateShopById,
	createShop,
	getShop,
	deleteShopById,
};
