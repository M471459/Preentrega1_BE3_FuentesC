import __dirname from "../../utils.js";

const opts = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "ITSATAPP DOC",
      description: "DOCUMENTACION ENTREGA FINAL",
    },
  },
  apis: [`${__dirname}/src/docs/*.yaml`],
};

export default opts;
