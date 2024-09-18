import  bcrypt  from "bcrypt";
export const validatePassword = async (inputPassword, storedPassword) => {
	return await bcrypt.compare(inputPassword, storedPassword);
};
