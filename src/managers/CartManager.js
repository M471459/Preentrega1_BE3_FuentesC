import fs from "fs";
import winstonLogger from "./utils/winston.util.js";

const path = "./src/managers/data/carts.json";
import { v4 as uuid } from "uuid";

let carts = [];

const createCart = async () => {
  await getCarts();
  try {
    const newCart = {
      id: uuid(),
      products: [],
    };
    carts.push(newCart);
    await fs.promises.writeFile(path, JSON.stringify(carts));
    return newCart;
  } catch (error) {
    winstonLogger.fatal(error);
  }
};

const getCarts = async () => {
  try {
    const fileJSON = await fs.promises.readFile(path, "utf-8");
    const parseFile = JSON.parse(fileJSON);
    carts = parseFile || [];
    return carts;
  } catch (error) {
    winstonLogger.fatal(error);
  }
};

const getCartsbyID = async (id) => {
  try {
    await getCarts();
    const cart = carts.find((s) => s.id === id);
    return cart;
  } catch (error) {
    winstonLogger.fatal(error);
  }
};

const addProductToCart = async (cid, pid) => {
  await getCarts();
  const cart = await getCartsbyID(cid);
  const productFounded = cart.products.find((p) => p.product === pid);
  winstonLogger.info(productFounded);

  if (productFounded === undefined) {
    const product = {
      product: pid,
      quantity: 1,
    };
    cart.products.push(product);
  } else productFounded.quantity++;

  await fs.promises.writeFile(path, JSON.stringify(carts));
  return carts;
};

export default {
  createCart,
  getCarts,
  getCartsbyID,
  addProductToCart,
};
