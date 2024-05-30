const { register } = require("../../usecases/auth");

exports.register = async (req, res, next) => {
  try {
    const { fullName, email, phoneNumber, password } = req?.body;
    const picture = req?.files?.picture;

    if (fullName == "" || !fullName) {
      return next({
        message: "fullName must be filled!",
        statusCode: 400,
      });
    }
    if (email == "" || !email) {
      return next({
        message: "Email must be filled!",
        statusCode: 400,
      });
    }
    if (phoneNumber == "" || !password) {
      return next({
        message: "phoneNumber must be filled!",
        statusCode: 400,
      });
    }
    if (password == "" || !password) {
      return next({
        message: "Password must be filled!",
        statusCode: 400,
      });
    }

    const data = await register({
      fullName,
      email,
      phoneNumber,
      password,
      picture,
    });

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};
