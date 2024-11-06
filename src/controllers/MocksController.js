import { faker } from "@faker-js/faker";
import { UserService } from "../repository/UserService.js";
import { productsService } from "../repository/ProductService.js";

const createUserMock = async (req, res, next) => {
  const name = faker.person.firstName().toLowerCase();
  const lastname = faker.person.lastName().toLowerCase();
  const data = {
    name,
    email: name + lastname + "@coder.com",
    password: "hola1234",
  };
  const one = await UserService.createUser(data);
  return res.status(201).json({
    response: one,
    message: "Usuario Creado",
  });
};

const createUsersMocks = async (req, res, next) => {
  const { n } = req.params;
  for (let i = 0; i <= n; i++) {
    const name = faker.person.firstName().toLowerCase();
    const lastname = faker.person.lastName().toLowerCase();
    const data = {
      name,
      email: name + lastname + "@coder.com",
      password: "hola1234",
      avatar: faker.image.avatar(),
    };
    const one = await UserService.createUser(data);
  }
  return res.status(201).json({
    message: n + " Usuarios Creados",
  });
};

const createProductsMocks = async (req, res, next) => {
  const { n } = req.params;
  for (let i = 0; i <= n; i++) {
    const title = faker.commerce.productName();
    const description = faker.commerce.productDescription();
    const code = faker.string.uuid(); // Genera un código único
    const stock = faker.number.int({ min: 0, max: 100 }); // Stock entre 0 y 100
    const status = faker.datatype.boolean(); // Estado booleano (true/false)
    const category = faker.commerce.department();
    const price = parseFloat(faker.commerce.price()); // Precio como número
    const thumbnail = [faker.image.url()];
    const data = {
      title,
      description,
      code,
      stock,
      status,
      category,
      price,
      thumbnail,
    };
    const one = await productsService.createProduct(data);
  }
  return res.status(201).json({
    message: n + " Productos Creados",
  });
};

export default { createUserMock, createUsersMocks, createProductsMocks };
