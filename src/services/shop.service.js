// services/shop.service.js

import { Shop } from "../models/shop.model";

export async function addShop(accountId, name, businessName, email) {
	return await Shop.create(accountId, name, businessName, email);
}

export async function updateShop(id, fieldsToUpdate) {
	return await Shop.update(id, fieldsToUpdate);
}

export async function getAllShops() {
	return await Shop.getAll();
}

export async function deleteShop(id) {
	return await Shop.delete(id);
}
