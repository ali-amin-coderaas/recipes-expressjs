import { Account } from "../models/account.model.js";

export async function addAccount(name, isActive, createdAt, updatedAt) {
	return await Account.create(name, isActive, createdAt, updatedAt);
}

export async function updateAccount(id, fieldsToUpdate) {
	return await Account.update(id, fieldsToUpdate);
}

export async function getAllAccounts() {
	return await Account.getAll();
}
export async function getById(id) {
	return await Account.getById(id);
}
export async function deleteAccount(id, isActive) {
	return await Account.delete(id, isActive);
}
