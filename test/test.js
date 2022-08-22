const mongoose = require("mongoose");
const products = require("../model/productModel");
// const request = require("supertest");

//require dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const app = require("../index");
let should = chai.should();
chai.use(chaiHttp);

//it will remove empty products
describe("products", () => {
  beforeEach((done) => {
    products.remove({}, (err) => {
      done();
    });
  });
});
//get route
describe("productController", () => {
  describe("Route GET /products/a", () => {
    it("it should get all the products", (done) => {
      chai
        .request(app)
        .get("/products/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.a("object");
        });
      done();
    });
  });
});

// post route
describe("/POST products", () => {
  it("it should not POST a book without pages field", (done) => {
    let product = {
      productName: "Laptop",
      productCatagory: "Electronics",
      productPrice: 45000,
      productQuantity: 219,
    };
    chai
      .request(app)
      .post("/products/add")
      .send(product)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("productQuantity");
        done();
      });
  });
  it("it should post the product", (done) => {
    let product = {
      productName: "Laptop",
      productCatagory: "Electronics",
      productPrice: 45000,
      productQuantity: 219,
    };
    chai
      .request(app)
      .post("/products/add")
      .send(product)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(product).to.be.a("object");
        expect(product).to.have.property("productName");
        expect(product).to.have.property("productCatagory");
        expect(product).to.have.property("productPrice");
        expect(product).to.have.property("productQuantity");
        done();
      });
  });
});

// product by id test

describe("/GET products/search/:id", () => {
  it("it should get the product by id", (done) => {
    let product = new products({
      productName: "Laptop698",
      productCatagory: "Electronics21",
      productPrice: 450200,
      productQuantity: 21239,
    });
    product.save((err, product) => {
      chai
        .request(app)
        .get("products/search" + product.id)
        .send(product)
        .end((err, res) => {
          expect(200, done);
          expect(product).to.be.a("object");
          expect(product).to.have.property("productName");
          expect(product).to.have.property("productCatagory");
          expect(product).to.have.property("productPrice");
          expect(product).to.have.property("productQuantity");
          expect(product).to.have.property("_id");
          done();
        });
    });
  });
});

// update by id

describe("/PUT/:id ", () => {
  it("it should update a product using  the id", (done) => {
    let product = new products({
      productName: "Laptop698",
      productCatagory: "Electronics21",
      productPrice: 450200,
      productQuantity: 21239,
    });
    product.save((err, product) => {
      chai
        .request(app)
        .put("/products/update/" + product.id)
        .send({
          productName: "mobile",
          productCatagory: "Electronics221",
          productPrice: 450,
          productQuantity: 29,
        })
        .end((err, res) => {
          expect(200, done);
          expect(product).to.be.a("object");
          expect(product).to.have.property("productName");
          expect(product).to.have.property("productCatagory");
          expect(product).to.have.property("productPrice");
          expect(product).to.have.property("productQuantity").eql(21239);
          expect(product).to.have.property("_id");
          done();
        });
    });
  });
});
