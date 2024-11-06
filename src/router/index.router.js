import ProductRouter from "./ProductRouter.js";
import CartRouter from "./CartRouter.js";
import UsersRouter from "./UsersRouter.js";
import SessionsRouter from "./sessionsRouter.js";
import MocksRouter from "./MocksRouter.js";
import { NegociosRouter } from "./negociosRouter.js";
import { Router } from "express";

const router = Router();

router.use("/products", ProductRouter);
router.use("/carts", CartRouter);
router.use("/sessions", SessionsRouter);
router.use("/users", UsersRouter);
router.use("/negocios", NegociosRouter);
router.use("/mocks", MocksRouter);

export default router;
