const { createUser } = require("../../repositories/user");
const { createToken } = require("../../helpers/createToken");

exports.register = async (payload) => {
  // const existingEmail = await getUserByEmail(payload.email);
  // const existingPhoneNumber = await getUserByPhoneNumber(payload.phoneNumber);

  // if (existingEmail) {
  //   throw { statusCode: 400, message: "Email already registered" };
  // }
  // if (existingPhoneNumber) {
  //   throw { statusCode: 400, message: "Phone Number already registered" };
  // }

  const user = await createUser(payload);

  delete user?.dataValues?.password;

  const data = createToken(user);

  return data;
};
