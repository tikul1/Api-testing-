const mongoose = require("mongoose");
const products = require("../model/productModel");
const request = require("supertest");

//require dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const app = require("../index");

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

// describe("/POST products", () => {
//   it("it should get the product by id", (done) => {
//     let ProductId = chai
//       .request(app)
//       .post("/search/:id")
//       .send(product)
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.be.a("object");
//         expect(res.body).to.have.property("productName");
//         expect(res.body).to.have.property("productCatagory");
//         expect(res.body).to.have.property("productPrice");
//         expect(res.body).to.have.property("productQuantity");
//         done();
//       });
//   });
// });
