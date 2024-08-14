import { Account } from "../models/account.model";

export async function addAccount(name, isActive, createdAt, updatedAt) {
	return await Account.create(name, isActive, createdAt, updatedAt);
}

export async function updateAccount(id, fieldsToUpdate) {
	return await Account.update(id, fieldsToUpdate);
}

export async function getAllAccounts() {
	return await Account.getAll();
}
export async function deleteAccount(id) {
	return await Account.delete(id);
}
