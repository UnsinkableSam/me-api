process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');


chai.should();

chai.use(chaiHttp);

describe('Reports', () => {

    describe('Post reports', () => {
        it('Success reports', (done) => {
            chai.request(server)
                .post("/reports")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    filename: "hello",
                    file: "hello"
                })
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.an("string");
                    res.body.should.be.equal("Success");


                    done();
                });
        });
    });



    describe('GET /reports/week/hello', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    

                    done();
                });
        });
    });



    
    describe('GET /reports/names', () => {
        it('200 HAPPY PATH', (done) => {
            
            chai.request(server)
                .get("/reports/names")
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    res.body.length.should.be.above(0);

                    done();
                });
        });
    });







    describe('POST /updateReports', () => {
        it('200 /updateReports', (done) => {
            chai.request(server)
                .post("/updateReports")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    filename: "testFilnamn12",
                    file: "testFilnamn12",
                })
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.an("string");
                    res.body.should.be.equal("Updated");


                    done();
                });
        });
    });




});