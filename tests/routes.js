const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../bin/www");

chai.should();

chai.use(chaiHttp);
const expect = require("chai").expect;

describe("API tasks", () => {
  // Test GET route
  describe("GET API TASKS", () => {
    describe(`GET /acronym?from:FROM&limit:LIMIT&search:SEARCH`, () => {
      it("Should get a collection acronyms based on the 'FROM', 'LIMIT' and 'SEARCH' attrs", (done) => {
        const from = 5;
        const limit = 10;
        const search = "fa";
        chai
          .request(server)
          .get(`/acronym?from=${from}&limit=${limit}&search=${search}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a("array");
            expect(res.body).to.have.lengthOf.within(0, limit);
            done();
          });
      });
    });
    describe(`GET /acronym?limit:LIMIT&search:SEARCH`, () => {
      it("Should NOT get a collection acronyms based on the 'FROM', 'LIMIT' and 'SEARCH' attrs because 'FROM' in missing", (done) => {
        const limit = 10;
        const search = "fa";
        chai
          .request(server)
          .get(`/acronym?limit=${limit}&search=${search}`)
          .end((err, res) => {
            expect(res.status).to.be.eq(400);
            expect(res.text).to.be.eq('"from" must be a number');
            done();
          });
      });
    });
    describe(`GET /acronym?from:FROM&limit:LIMIT&search:SEARCH`, () => {
      it("Should NOT get a collection acronyms based on the 'FROM', 'LIMIT' and 'SEARCH' attrs because 'LIMIT' in missing", (done) => {
        const from = 5;
        const search = "fa";
        chai
          .request(server)
          .get(`/acronym?from=${from}&search=${search}`)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.text).to.be.eq('"limit" must be a number');
            done();
          });
      });
    });
    describe(`GET /acronym?from:FROM&limit:LIMIT`, () => {
      it("Should NOT get a collection acronyms based on the 'FROM', 'LIMIT' and 'SEARCH' attrs because 'LIMIT' in missing", (done) => {
        const from = 5;
        const limit = 10;
        chai
          .request(server)
          .get(`/acronym?from=${from}&limit=${limit}`)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.text).to.be.eq('"search" is required');
            done();
          });
      });
    });
  });

  // Test POST route
  describe("POST API TASKS", () => {
    describe(`POST /acronym?key:KEY&value:VALUE`, () => {
      it("Should create a new acronym based on the 'KEY', 'VALUE' attrs", (done) => {
        const key = "TEST1";
        const value = "ESTE ES UN TEST";
        chai
          .request(server)
          .post(`/acronym?key=${key}&value=${value}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a("object");
            expect(res.body).to.have.property("key").eq(key);
            expect(res.body).to.have.property("value").eq(value);
            expect(res.body).to.have.property("_id");
            done();
          });
      });
    });
    describe("POST API TASKS", () => {
      describe(`POST /acronym?value:VALUE`, () => {
        it("Should NOT create a new acronym based on the 'KEY', 'VALUE' attrs because 'KEY' is missing", (done) => {
          const value = "ESTE ES UN TEST";
          chai
            .request(server)
            .post(`/acronym?value=${value}`)
            .end((err, res) => {
              expect(res).to.have.status(400);
              expect(res.text).to.be.eq('"key" is required');
              done();
            });
        });
      });
      describe(`POST /acronym?key:KEY`, () => {
        it("Should NOT create a new acronym based on the 'KEY', 'VALUE' attrs because 'VALUE' is missing", (done) => {
          const key = "TEST1";
          chai
            .request(server)
            .post(`/acronym?key=${key}`)
            .end((err, res) => {
              expect(res).to.have.status(400);
              expect(res.text).to.be.eq('"value" is required');
              done();
            });
        });
      });
    });
  });

  // Test PUT route
  describe("PUT API TASKS", () => {
    describe(`PUT /acronym?key:KEY&value:VALUE`, () => {
      it("Should update an acronym based on the 'KEY', 'VALUE' attrs", (done) => {
        const key = "TEST1";
        const value = "ESTE ES UN TEST";
        chai
          .request(server)
          .put(`/acronym?key=${key}&value=${value}`)
          .set("api_key", process.env.API_KEY)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a("object");
            expect(res.body).to.have.property("key").eq(key);
            expect(res.body).to.have.property("value").eq(value);
            expect(res.body).to.have.property("_id");
            done();
          });
      });
    });
    describe(`PUT /acronym?value:VALUE`, () => {
      it("Should NOT update an acronym based on the 'KEY', 'VALUE' attrs because 'KEY' is missing", (done) => {
        const value = "ESTE ES UN TEST";
        chai
          .request(server)
          .put(`/acronym?value=${value}`)
          .set("api_key", process.env.API_KEY)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.text).to.be.eq('"key" is required');
            done();
          });
      });
    });
    describe(`PUT /acronym?key:KEY`, () => {
      it("Should NOT update an acronym based on the 'KEY', 'VALUE' attrs because 'VALUE' is missing", (done) => {
        const key = "TEST1";
        chai
          .request(server)
          .put(`/acronym?key=${key}`)
          .set("api_key", process.env.API_KEY)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.text).to.be.eq('"value" is required');
            done();
          });
      });
    });
    describe(`PUT /acronym`, () => {
      it("Should NOT update an acronym based on the 'KEY', 'VALUE' attrs because 'API_KEY' is missing", (done) => {
        chai
          .request(server)
          .put(`/acronym`)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.text).to.be.eq("You are not authorized to do this");
            done();
          });
      });
    });
  });

  // Test DELETE route
  describe("DELETE API TASKS", () => {
    describe(`DELETE /acronym?id:ID`, () => {
      it("Should delete an acronym based on the 'ID'", (done) => {
        const id = "60f4ebf4b8e36842345f6c5d";
        chai
          .request(server)
          .delete(`/acronym?id=${id}`)
          .set("api_key", process.env.API_KEY)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("n");
            expect(res.body).to.have.property("ok").eq(1);
            expect(res.body).to.have.property("deletedCount");
            done();
          });
      });
    });
    describe(`DELETE /acronym`, () => {
      it("Should NOT delete an acronym based on a 'ID' because 'ID' is missing", (done) => {
        chai
          .request(server)
          .delete(`/acronym`)
          .set("api_key", process.env.API_KEY)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.text).to.be.eq('"id" is required');
            done();
          });
      });
    });
    describe(`DELETE /acronym`, () => {
      it("Should NOT delete an acronym based on a 'ID' because 'API_KEY' is missing", (done) => {
        chai
          .request(server)
          .delete(`/acronym`)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.text).to.be.eq("You are not authorized to do this");
            done();
            console.log("ad");
          });
      });
    });
  });
});
