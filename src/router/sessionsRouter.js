import { Router } from "express";
import passport from "passport";
import { passportCall } from "../utils/utils.js";
import SessionController from "../controllers/SessionController.js";
import jwt from "jsonwebtoken";
export const SessionRouter = Router();

//sessionRouter.use(passport.authenticate("jwt", { session: false }));

SessionRouter.get("/error", SessionController.getError);
/*sessionRouter.get("/error", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  return res.status(400).json({ error: `Error en passport... :(` });
});
*/
// 3) autenticar la estrategia en el router de sessions (en la ruta...)

SessionRouter.post(
  "/register",
  passport.authenticate("registro", {
    failureRedirect: "/api/sessions/error",
    session: false,
  }),
  SessionController.Register
);
/*sessionRouter.post(
  "/registro",
  passport.authenticate("registro", {
    failureRedirect: "/api/sessions/error",
    session: false,
  }),
  (req, res) => {
    console.log("Usuario nuevo creado");

    res.setHeader("Content-Type", "application/json");
    res.status(201).json({
      message: "Registro exitoso",
      usuarioRegistrado: req.user,
    });
  }
);
*/

SessionRouter.post("/login", passportCall("login"), SessionController.Login);
/*sessionRouter.post("/login", passportCall("login"), (req, res) => {
  let token = jwt.sign(req.user, config.SECRET, {
    expiresIn: "1h",
  });
  res.cookie("CoderCookie", token, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
  });

  res.setHeader("Content-Type", "application/json");
  return res
    .status(200)
    .json({ payload: "login exitoso", usuarioLogueado: req.user });
});
*/
/*
sessionRouter.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/error",
    session: false,
    failureFlash: true,
  }),
  (req, res, info) => {
    //req.session.usuario = req.user;
    delete req.user.password;

    let token = jwt.sign(req.user, config.SECRET, {
      expiresIn: "1h",
    });
    res.cookie("CoderCookie", token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({
      message: "Login exitoso",
      usuarioLogueado: req.user,
      token,
    });
  }
);
*/
/*sessionRouter.get("/logout", (req, res) => {
  let { web } = req.query;

  req.session.destroy((error) => {
    if (error) {
      res.setHeader("Content-Type", "application/json");
      return res.status(500).json({ error: `Error en logout` });
    }

    if (web) {
      return res.redirect("/login?mensaje=Logout exitoso...!!!");
    }
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({ payload: "Logout exitoso" });
  });
});
*/
SessionRouter.get(
  "/current",
  passportCall("current"),
  SessionController.getPerfil
);
/*sessionRouter.get("/usuario", passportCall("current"), (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({
    mensaje: "Perfil usuario",
    datosUsuario: req.user,
  });
});
*/
/*sessionRouter.get("/github", passportCall("github"), (req, res) => {
  let token = jwt.sign(req.user, config.SECRET, {
    expiresIn: "1h",
  });
  res.cookie("CoderCookie", token, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
  });

  res.setHeader("Content-Type", "application/json");
  return res
    .status(200)
    .json({ payload: "login exitoso", usuarioLogueado: req.user });
});

sessionRouter.get(
  "/github",
  passport.authenticate("github", {}),
  (req, res) => {}
);

sessionRouter.get(
  "/callbackGithub",
  passport.authenticate("github", { failureRedirect: "/api/sessions/error" }),
  (req, res) => {
    let token = jwt.sign(req.user, config.SECRET, {
      expiresIn: "1h",
    });
    console.log(token);
    res.cookie("CoderCookie", token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({
      message: "Login exitoso",
      usuarioLogueado: req.user,
    });
  }
);
*/
/*SessionRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

SessionRouter.get(
  "/callbackGoogle",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Generar el token JWT
    const JWT_SECRET = "ITSatApp";
    const token = jwt.sign(req.user, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Guardar el token en una cookie
    res.cookie("ITSatApp", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    res.redirect("http://localhost:3000/home"); // Redirigir a una ruta protegida después de la autenticación
  }
);
*/

export default SessionRouter;
