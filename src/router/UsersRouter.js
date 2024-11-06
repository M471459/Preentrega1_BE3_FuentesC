import { Router } from "express";
import { passportCall } from "../utils/utils.js";
import UserController from "../controllers/UserController.js";

const UsersRouter = Router();

UsersRouter.use(passportCall("current"));
UsersRouter.get("/", UserController.getUsersAll);
UsersRouter.get("/:id", UserController.getUser);

export default UsersRouter;
