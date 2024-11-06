import { Router } from "express";
import MocksController from "../controllers/MocksController.js";

const MocksRouter = Router();

MocksRouter.get("/", MocksController.createUserMock);
MocksRouter.get("/users/:n", MocksController.createUsersMocks);
MocksRouter.get("/products/:n", MocksController.createProductsMocks);

export default MocksRouter;
