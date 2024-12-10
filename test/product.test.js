import request from "supertest";
import app from "../src/app.js";
import { expect } from "chai";
import supertest from "supertest";
import passport from "passport";
import jwt from "jsonwebtoken";
import config from "../src/config/env.config.js";

const requester = supertest(`http://localhost:8001`);

describe("Testing de Endpints de Products", () => {
  it("Testing de Login", async () => {
    const response = await requester.post("/api/sessions/login").send({
      email: "matias1@test.com",
      password: "123",
      role: "admin",
    });
    expect(response.statusCode).to.be.equals(200);
    expect(response.body).to.have.property("payload", "login exitoso");
    expect(response.headers["set-cookie"][0]).to.include("ITSatApp");
  });
});

describe("Testeando endpoints de PRODUCTS", () => {
  let token;
  let cookies;
  let pid;
  const data = {
    title: "Crossfit Shoes",
    description: "Shoes for Crossfit",
    code: "AF34DS",
    status: true,
    category: "Crossfit",
    stock: 200,
    price: 200,
  };
  const data2 = {
    title: "Crossfit Shoes",
    description: "Shoes for Crossfit",
    code: "AF34DS",
    status: true,
    category: "Crossfit",
    stock: 100,
    price: 150,
  };
  before(() => {
    const userPayload = {
      email: "matias1@test.com",
      password: "123",
      role: "admin",
    };

    token = jwt.sign(userPayload, process.env.SECRET || "default_secret", {
      expiresIn: "1h",
    });
  });

  it("GET /api/products", async () => {
    const response = await requester
      .get("/api/products")
      .set("Cookie", `ITSatApp=${token}`);

    expect(response.statusCode).to.equal(201);
  });

  it("POST /api/products", async () => {
    const response = await requester
      .post("/api/products")
      .send(data)
      .set("Cookie", `ITSatApp=${token}`);
    const { _body, statusCode } = response;
    pid = _body.product._id;
    expect(response.statusCode).to.equal(201);
  });
  it("GET /api/products/pid", async () => {
    const response = await requester
      .get("/api/products/" + pid)
      .set("Cookie", `ITSatApp=${token}`);

    expect(response.statusCode).to.equal(201);
  });

  it("DELETE /api/products/pid", async () => {
    const response = await requester
      .delete("/api/products/" + pid)
      .set("Cookie", `ITSatApp=${token}`);
    expect(response.statusCode).to.equal(201);
  });
  /*


  it("UPDATE /api/products/pid", async () => {
    const response = await requester
      .put("/api/products")
      .send(data2)
      .set("Cookie", `ITSatApp=${token}`);
    expect(response.statusCode).to.equal(201);
  });

  
  */
});
