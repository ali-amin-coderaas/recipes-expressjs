import validate from "../utils/validate.js";
import shopSchemas from "./shop.schema.js";

const validateShopQuery = () => {
	return validate(shopSchemas.getAllShops, "query");
};

const validateShopId = () => {
	return validate(shopSchemas.getShopById, "params");
};

const validateCreateShop = () => {
	return validate(shopSchemas.createShop);
};

const validateUpdateShop = () => {
	return validate(shopSchemas.updateShop);
};

export default {
	validateCreateShop,
	validateShopId,
	validateShopQuery,
	validateUpdateShop,
};
