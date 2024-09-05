// services/shop.service.js
import { Shop } from "../models/shop.model.js";

export async function addShop(accountId, name, businessName, email, industry) {
	return await Shop.create(accountId, name, businessName, email, industry);
}

export async function updateShop(shopId, accountId, fieldsToUpdate) {
	return await Shop.update(shopId, accountId, fieldsToUpdate);
}

export async function getAllShops(
	accountId,
	page,
	pageSize,
	searchQuery,
	sortBy,
	order
) {
	return await Shop.getAll(
		accountId,
		page,
		pageSize,
		searchQuery,
		sortBy,
		order
	);
}

export async function getById(accountId, shopId) {
	return await Shop.getById(accountId, shopId);
}

export async function deleteShop(accountId, shopId) {
	return await Shop.delete(accountId, shopId);
}

export async function getShopsByIndustry() {
	const shopsByIndustry = await Shop.getByIndustry();
	return shopsByIndustry;
}
