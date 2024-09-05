import { Account } from "../models/account.model.js";

export async function addAccount(name) {
	return await Account.create(name);
}

export async function updateAccount(accountId, fieldsToUpdate) {
	return await Account.update(accountId, fieldsToUpdate);
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
export async function getById(accountId) {
	return await Account.getById(accountId);
}
export async function deleteAccount(accountId) {
	return await Account.delete(accountId);
}

export async function getAccountsByType() {
	return await Account.getByType();
}
