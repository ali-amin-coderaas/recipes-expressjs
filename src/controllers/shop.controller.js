import {
	addShop,
	deleteShop,
	getAllShops,
	getById,
	updateShop,
} from "../services/shop.service.js";

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

const getShops = async (req, res) => {
	const { accountId } = req.params;
	try {
		const shops = await getAllShops(accountId);
		if (shops.length === 0) {
			return res.status(404).json({ error: "No shops found" });
		}
		return res.json(shops);
	} catch (error) {
		res
			.status(500)
			.json({ error: "An error occurred while fetching the shops" });
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
	const isActive = 0;

	try {
		const result = await deleteShop(shopId, accountId, isActive);
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
