const utils = require("../../utils");
const tokenHelper = require("../../helper/user/token-service");
const Admin = require("../../models/admin");
const config = require("../../config/index.js");

const signin = async (user) => {
  const { email, password } = user;

  if (!email || !password) {
    return {
      message: "Email and Password is required",
      statusCode: config.statusCodes.CLIENT_ERROR.UNAUTHORIZED,
    };
  }

  const existing_user = await Admin.findOne({ email }).lean();

  console.log(existing_user, "existing_user");

  if (!existing_user) {
    return {
      message: "Admin not found",
      statusCode: config.statusCodes.CLIENT_ERROR.UNAUTHORIZED,
    };
  }

  const tokenService = new tokenHelper();

  let passwordMatched = await utils.encryption.comparePassword(
    password,
    existing_user.password
  );

  if (!passwordMatched) {
    return {
      message: "Password did not match, please check again",
      statusCode: config.statusCodes.CLIENT_ERROR.UNAUTHORIZED,
    };
  }

  let token = tokenService.getLoggedInUserToken(existing_user);

  if (!token) {
    return {
      message: "Token generation failed while login",
      statusCode: config.statusCodes.SERVER_ERROR.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    message: "Welcome Back",
    token: token,
    statusCode: config.statusCodes.SUCCESSFUL.SUCCESS,
  };
};

module.exports = {
  signin,
};
