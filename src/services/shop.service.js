// services/shop.service.js
import { Shop } from "../models/shop.model.js";

export async function addShop(accountId, name, businessName, email) {
	return await Shop.create(accountId, name, businessName, email);
}

export async function updateShop(shopId, accountId, fieldsToUpdate) {
	return await Shop.update(shopId, accountId, fieldsToUpdate);
}

export async function getAllShops(accountId) {
	return await Shop.getAll(accountId);
}

export async function getById(shopId, accountId) {
	return await Shop.getById(shopId, accountId);
}

export async function deleteShop(shopId, accountId) {
	return await Shop.delete(shopId, accountId);
}
