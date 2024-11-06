import { UserService } from "../repository/UserService.js";
import winstonLogger from "../utils/winston.util.js";
import CustomError from "../utils/errors/CustomError.util.js";
import errors from "../utils/errors/errors.js";

async function getUsersAll(req, res) {
  let users = await UserService.getUsersAll();
  try {
    winstonLogger.info(users);
    return res.status(200).json({ status: "OK", users });
  } catch {
    CustomError.newError(errors.error);
  }
}

async function getUser(req, res, next) {
  try {
    const { uid } = req.params;
    const response = await UserService.getUser({ _id: uid });
    if (response) {
      return res.status(200).json({ message: "Usuario encontrado:", response });
    } else {
      CustomError.newError(errors.notFound);
    }
  } catch (error) {
    return next(error);
  }
}

export default {
  getUsersAll,
  getUser,
};
