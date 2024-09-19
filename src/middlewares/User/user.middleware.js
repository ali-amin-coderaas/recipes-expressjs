import validate from "../utils/validate";
import UserSchemas from "./user.schema";

const validateCreateUser = () => {
	return validate(UserSchemas.createUser);
};

export default {
	validateCreateUser,
};
