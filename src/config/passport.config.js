import passport from "passport";
import local from "passport-local";
import { UsuariosDAO } from "../dao/UsuariosDAO.js";
import { generaHash, validaPass } from "../utils/utils.js";
import passportJWT from "passport-jwt";
import config from "../config/env.config.js";
import { UsuariosDTO } from "../dto/usuariosDTO.js";
import winstonLogger from "../utils/winston.util.js";

const buscarToken = (req) => {
  let token = null;

  if (req.cookies.ITSatApp) {
    token = req.cookies.ITSatApp;
  }

  return token;
};

export const iniciaPassport = () => {
  // 1) definir estrategias
  passport.use(
    "registro",
    new local.Strategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          let usuarioParaDB = req.body;
          let existe = await UsuariosDAO.getBy({ email: username });
          if (existe) {
            winstonLogger.info("usuario repetido");
            return done(null, false);
          }
          let nuevoUsuario = await UsuariosDAO.create({
            email: username,
            last_name: usuarioParaDB.name,
            first_name: usuarioParaDB.lastname,
            role: usuarioParaDB.role,
            password: generaHash(usuarioParaDB.password),
          });
          const usuarioRegistrado = new UsuariosDTO(nuevoUsuario);

          return done(null, usuarioRegistrado);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    // login (local)
    "login",
    new local.Strategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          let usuario = await UsuariosDAO.getBy({ email: username });
          if (!usuario) {
            winstonLogger.error("usuario invalido:" + username);
            return done(null, false, { message: "Login failed!" });
          }

          if (!validaPass(password, usuario.password)) {
            winstonLogger.error("password inválida:" + username);
            return done(null, false, { message: "Contraseña Incorrecta" });
          }

          delete usuario.password;

          return done(null, usuario);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "current",
    new passportJWT.Strategy(
      {
        secretOrKey: config.SECRET,
        jwtFromRequest: new passportJWT.ExtractJwt.fromExtractors([
          buscarToken,
        ]),
      },
      async (contenidoToken, done) => {
        try {
          return done(null, contenidoToken);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
