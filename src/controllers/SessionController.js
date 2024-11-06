//import { ProductService } from "../repository/ProductService.js";
import { UsuariosDAO } from "../dao/UsuariosDAO.js";
import jwt from "jsonwebtoken";
import config from "../config/env.config.js";
import { datosUsuario } from "../dto/usuariosDTOperfil.js";
import { cartDAO } from "../dao/cartDAO.js";
import winstonLogger from "../utils/winston.util.js";

async function getError(req, res) {
  res.setHeader("Content-Type", "application/json");
  return res.status(400).json({ error: `Error en passport... :(` });
}

async function Register(req, res) {
  winstonLogger.info("usuario nuevo creado");

  res.setHeader("Content-Type", "application/json");
  res.status(201).json({
    message: "Registro exitoso",
    usuarioRegistrado: req.user,
  });
}
async function Login(req, res) {
  let token = jwt.sign(req.user, config.SECRET, {
    expiresIn: "1h",
  });
  res.clearCookie("ITSatApp");
  res.cookie("ITSatApp", token, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    // Asegúrate que el path esté bien configurado
  });
  const nuevoCarrito = await cartDAO.create();
  req.user.cart = nuevoCarrito._id;
  await UsuariosDAO.updateUsuario(req.user._id, { cart: req.user.cart });
  const usuarioLogueado = req.user;
  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({ payload: "login exitoso", usuarioLogueado });
}

async function getPerfil(req, res) {
  const usuarioLogueado = new datosUsuario(req.user);
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({
    mensaje: "Perfil usuario",
    datosUsuario: usuarioLogueado,
  });
}

export default {
  Register,
  getError,
  Login,
  getPerfil,
};
