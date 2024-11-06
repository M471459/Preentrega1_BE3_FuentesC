import { UsuariosDAO as DAO } from "../dao/UsuariosDAO.js";
import winstonLogger from "../utils/winston.util.js";

class userService {
  constructor(dao) {
    this.usuariosDAO = dao;
  }
  async createUser(body) {
    try {
      const user = await DAO.create(body);
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async getUsersAll() {
    try {
      const users = await DAO.getAll();
      return users;
    } catch (error) {
      console.log(error);
    }
  }
  async getUser(id) {
    try {
      const users = await DAO.getBy({ id });
      return users;
    } catch (error) {
      console.log(error);
    }
  }
}
export const UserService = new userService(new DAO());
