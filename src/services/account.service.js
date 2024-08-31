import { Account } from "../models/account.model.js";

export async function addAccount(name) {
	return await Account.create(name);
}

export async function updateAccount(id, fieldsToUpdate) {
	return await Account.update(id, fieldsToUpdate);
}

export async function getAllAccounts(
	page,
	pageSize,
	searchQuery,
	sortBy,
	order
) {
	return await Account.getAll(page, pageSize, searchQuery, sortBy, order);
}
export async function getById(id) {
	return await Account.getById(id);
}
export async function deleteAccount(id) {
	return await Account.delete(id);
}
