const autheService = require("../../services/auth/authService");

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = {
    email,
    password,
  };

  const { message, token, statusCode } = await autheService.signin(user);

  // const cookieOptions = {
  //   expires: new Date(Date.now() + 60000 * 60 * 60),
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production" ? true : false,
  //   sameSite: "strict",
  // };

  // res.cookie("token", token, cookieOptions);

  res.status(statusCode).json({
    token,
    message,
  });
};

module.exports = {
  signin,
};
